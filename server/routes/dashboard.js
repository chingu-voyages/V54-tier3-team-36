import express from "express";
import Dashboard from "../models/Dashboard.js";

const router = express.Router();
// routes for dashboard goes here

router.get("/:id", async (req, res)=> {
  const {id} = req.params;

  try {
    const dashboard = await Dashboard.findOne({ user: id});
    
    if (!dashboard) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data:dashboard})
  } catch (error) {
    console.log("error in fetching dashboard: ", error.message);
    res.status(500).json({ success: false, message: "Server Error"})
  }
})




export default router