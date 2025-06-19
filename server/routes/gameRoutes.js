import express from "express";
import FeedTheAnimal from "../models/FeedTheAnimal.js";
import auth from "../middleware/auth-middleware.js";
import Dashboard from "../models/Dashboard.js";

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


// general route (not specific for a game)

router.get("/result/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
        const userDashboard = await Dashboard.findOne({ userId: id})
      if (!userDashboard) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data:userDashboard.games})
  } catch (error) {
    console.log("error in fetching dashboard: ", error.message);
    res.status(500).json({ success: false, message: "Server Error"})
  }
})


router.post("/result", async (req, res) => {
    const { userId, gameName, score, win} = req.body;
    if (!gameName) {
        return res.status(400).json({ success: false, message: "Game name is required."})
    }
    
    try {
        const userDashboard = await Dashboard.findOne({ userId: userId})
      if (!userDashboard) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
        const gameHistory = userDashboard.games.find(game => game.gameName === gameName)

        if (gameHistory) {
            // Update existing game stats
            console.log("Updating past game history")
            gameHistory.history.push({score});

            if (score > gameHistory.highestScore) {
                gameHistory.highestScore = score;
            }

            if (win) {
                gameHistory.numOfWins += 1;
            }

        } else {
            // Create new game history
            console.log("Adding new game record")
    
            const record = {
                gameName: gameName, 
                numOfWins: win ? 1 : 0, 
                highestScore: score, 
                history: [{score}] 
            };
            userDashboard.games.push(record)
        }
        
        // Always await save!
        await userDashboard.save()
        console.log(userDashboard)
        return res.status(200).json({ success: true, message: "Game stats updated."})

    } catch (error) {
        console.log("Error in updating game stats", error.message)
    res.status(500).json({ success: false, message: "Server error"});
    }
});


export default router;