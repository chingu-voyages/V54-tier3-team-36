import express from "express";
import FeedTheAnimal from "../models/FeedTheAnimal.js";

const router = express.Router();

// Save game result
router.post('/feed-the-animal', async (req, res) => {
    try {
        console.log('Request body:', req.body);
        
        const gameData = {
            userId: req.body.userId || 'test-user-id',
            score: req.body.score,
            livesLeft: req.body.livesLeft,
            timePlayed: req.body.timePlayed,
            correctFeeds: req.body.correctFeeds,
            incorrectFeeds: req.body.incorrectFeeds,
            gameOverReason: req.body.gameOverReason
        };
        
        console.log('Creating game result with data:', gameData);
        
        const gameResult = new FeedTheAnimal(gameData);
        const savedResult = await gameResult.save();
        
        console.log('Game result saved successfully:', savedResult);
        res.status(201).send(savedResult);
    } catch (error) {
        console.error('Error saving game result:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        if (error.name === 'ValidationError') {
            console.error('Validation errors:', error.errors);
        }
        console.error('Full error:', error);
        res.status(500).send({
            error: 'Failed to save game result',
            details: error.message,
            name: error.name
        });
    }
});

// Get user's game history
router.get('/feed-the-animal/history',  async (req, res) => {
    try {
        const games = await FeedTheAnimal.find({userId: req.user._id})
            .sort({createdAt: -1})
            .limit(10);
        res.send(games);
    } catch (error) {
        res.status(500).send({error: 'Failed to fetch game history'});
    }
});

// Get leaderboard
// get('/feed-the-animal/leaderboard', async (req, res) => {
//     try {
//         const leaderboard = await FeedTheAnimal.aggregate([
//             {$sort: {score: -1}},
//             {$limit: 10},
//             {
//                 $lookup: {
//                     from: 'users',
//                     localField: 'userId',
//                     foreignField: '_id',
//                     as: 'user',
//                     pipeline: [
//                         {$project: {username: 1}}
//                     ]
//                 }
//             },
//             {$unwind: '$user'}
//         ]);
//         res.send(leaderboard);
//     } catch (error) {
//         console.error('Error fetching leaderboard:', error);
//         res.status(500).send({error: 'Failed to fetch leaderboard'});
//     }
// });

export default router;
