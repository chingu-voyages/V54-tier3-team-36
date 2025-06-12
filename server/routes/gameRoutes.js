// server/routes/gameRoutes.js
import express from "express";
import FeedTheAnimal from "../models/FeedTheAnimal.js";
import auth from "../middleware/auth-middleware.js";

const router = express.Router();

// Save game result - USE AUTH MIDDLEWARE HERE
router.post('/save', auth, async (req, res) => {
    try {

        const userData = req.user.user || req.user;

        if (!userData || !userData._id) {
            console.error('[Game Route] No user found in token');
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
        console.error('[Game Route] Error saving game:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to save game result',
            details: error.message
        });
    }
});

// Get game history - USE AUTH MIDDLEWARE HERE TOO
router.get('/history', auth, async (req, res) => {
    try {


        const userId = req.user._id.toString();

        const games = await FeedTheAnimal.find({userId})
            .sort({createdAt: -1})
            .limit(10);

        res.json({
            success: true,
            data: games
        });
    } catch (error) {
        console.error('[Game Route] Error fetching history:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch game history'
        });
    }
});

// Public leaderboard - NO AUTH NEEDED
router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await FeedTheAnimal.aggregate([
            {$sort: {score: -1}},
            {$limit: 10},
            {
                $project: {
                    score: 1,
                    playerName: 1,
                    createdAt: 1,
                    gameType: 1
                }
            }
        ]);

        res.json({
            success: true,
            data: leaderboard
        });
    } catch (error) {
        console.error('[Game Route] Error fetching leaderboard:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch leaderboard'
        });
    }
});

export default router;