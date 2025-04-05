import express from "express";
import User from '../models/User.js'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    
    // Manual validation
    if (!name || !email || !password || !age) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    
    // convert user input email to lower case
    const lowerEmail = email.toLowerCase()

    // Check if user already exists
    const existingUser = await User.findOne({ lowerEmail });
    if ( existingUser ) {
      return res.status(400).json({ success: false, message: "User already exists"});
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, email: lowerEmail, password: hashedPassword, age });
    await newUser.save();

    res.status(201).json({ success: true, data: newUser });

  } catch (error) {
    console.log("Error in creating user", error.message)
    res.status(500).json({ success: false, message: "Server error"});
  }
})


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email or password is missing
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    
    // convert user input email to lower case
    const lowerEmail = email.toLowerCase()
    console.log(lowerEmail)

    const user = await User.findOne({ lowerEmail });
    console.log(user)

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    res.status(200).json({success: true, data: user})

  } catch (error) {
    console.log("Error in login", error.message)
    res.status(500).json({ success: false, message: "Server error"});
  }
});


/// IGNORE - NOT USED
router.get("/", async (req, res)=> {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("error in fetching users: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
})

router.post("/", async (req, res) => {
    const user = req.body; 
    
    if(!user.name || !user.email || !user.password || !user.age ) {
        return res.status(400).json({ success:false, message: "Please provide all fields"})
    }

    const newUser = new User(user)

    try {
        await newUser.save();
        res.status(201).json({success:true, data: newUser});
    } catch (error) {
        console.error("Error in creating user:", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
});

router.put("/:id", async (req, res) => {
    const {id} = req.params;

    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message: "Invalid user id"})
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {new:true});
        res.status(200).json({ success:true, data: updatedUser })
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"})
    }
})


router.delete("/:id", async (req, res)=> {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message: "Invalid user id"})
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success:true, message: "User deleted" });
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"})
    }
})

export default router