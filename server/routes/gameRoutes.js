import express from "express";
import FeedTheAnimal from "../models/FeedTheAnimal.js";
import auth from "../middleware/auth-middleware.js";

const router = express.Router();

router.post('/save', auth, async (req, res) => {
    try {
        const userData = req.user.user || req.user;

        if (!userData || !userData._id) {
            return res.status(401).json({
                success: false,
                error: 'Invalid user token'
            });
        }

        const userId = userData._id;
        const playerName = userData.name;

        const gameData = {
            userId: userId.toString(),
            playerName: playerName,
            sessionId: req.body.sessionId,
            gameType: req.body.gameType,
            score: req.body.score,
            livesLeft: req.body.livesLeft,
            timePlayed: req.body.timePlayed,
            correctFeeds: req.body.correctFeeds,
            incorrectFeeds: req.body.incorrectFeeds,
            gameOverReason: req.body.gameOverReason,
            savedAt: req.body.savedAt || new Date().toISOString()
        };

        const gameResult = new FeedTheAnimal(gameData);
        const savedResult = await gameResult.save();

        res.status(201).json({
            success: true,
            message: 'Game saved successfully',
            data: savedResult
        });

    } catch (error) {
        console.error('Error saving game:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to save game result',
            details: error.message
        });
    }
});

router.get('/history', auth, async (req, res) => {
    try {
        const userData = req.user.user || req.user;

        if (!userData || !userData._id) {
            return res.status(401).json({
                success: false,
                error: 'Invalid user token'
            });
        }

        const userId = userData._id;
        const playerName = userData.name;

        const games = await FeedTheAnimal.find({userId})
            .sort({createdAt: -1})
            .limit(10);

        const totalGamesPlayed = await FeedTheAnimal.countDocuments({userId});

        const bestScoreGame = await FeedTheAnimal.findOne({userId})
            .sort({score: -1})
            .limit(1);

        // Get additional stats
        const stats = await FeedTheAnimal.aggregate([
            {
                $match: { userId: userId }
            },
            {
                $group: {
                    _id: null,
                    totalGames: { $sum: 1 },
                    bestScore: { $max: "$score" },
                    averageScore: { $avg: "$score" },
                    totalCorrectFeeds: { $sum: "$correctFeeds" },
                    totalIncorrectFeeds: { $sum: "$incorrectFeeds" },
                    longestTimePlayed: { $max: "$timePlayed" }
                }
            }
        ]);

        const gameStats = stats.length > 0 ? stats[0] : {
            totalGames: 0,
            bestScore: 0,
            averageScore: 0,
            totalCorrectFeeds: 0,
            totalIncorrectFeeds: 0,
            longestTimePlayed: 0
        };

        res.json({
            success: true,
            data: {
                statistics: {
                    totalGamesPlayed: totalGamesPlayed,
                    bestScore: gameStats.bestScore,
                    averageScore: Math.round(gameStats.averageScore * 100) / 100, // Round to 2 decimal places
                    totalCorrectFeeds: gameStats.totalCorrectFeeds,
                    totalIncorrectFeeds: gameStats.totalIncorrectFeeds,
                    longestTimePlayed: gameStats.longestTimePlayed,
                    bestGame: bestScoreGame
                }
            }
        });
    } catch (error) {
        console.error('[Game Route] Error fetching history:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch game history'
        });
    }
});


export default router;