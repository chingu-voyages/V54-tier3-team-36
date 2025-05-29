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
		const userDashboard = await Dashboard.findOne({ userId: id})
	  if (!userDashboard) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

		const pastGameHistory = userDashboard.games.find(game => game.gameName = gameName)

		if (!pastGameHistory) {
			// add result to dashboard
		}


		


	} catch (error) {

	}
});

export default router