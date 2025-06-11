import express from "express";
import Dashboard from "../models/Dashboard.js";

const router = express.Router();
// routes for games goes here

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

export default router