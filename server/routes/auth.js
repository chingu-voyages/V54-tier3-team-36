import express from "express";
import User from '../models/User.js'
import Dashboard from "../models/Dashboard.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.get('/verifytoken', (req,res) => {
  const auth = req.headers.authorization;
  if (!auth)
    return res.status(401).json({success:false, message: "Unauthorized"})
  const token = auth.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    res.status(200).json({ success: true, user: user.user})
  } catch (error) {
    return res.status(401).json({success:false, message: "Unauthorized"})
  }
})

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
    const existingUser = await User.findOne({email: lowerEmail});
    if ( existingUser ) {
      return res.status(400).json({ success: false, message: "User already exists"});
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, email: lowerEmail, password: hashedPassword, age });
    await newUser.save();

    // Create dashboard for new user
    const newDashboard = new Dashboard({user: newUser._id});
    await newDashboard.save()

    // Only sent the token back in response. will validate the token to retrieve user data
    const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          age: user.age
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
    res.status(201).json({ success: true, token: token });

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
    const user = await User.findOne({ email: lowerEmail});

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    
    // Only sent the token back in response. will validate the token to retrieve user data
    const token = jwt.sign({user: user}, process.env.JWT_TOKEN_SECRET );
    res.status(200).json({success: true, token: token})

  } catch (error) {
    console.log("Error in login", error.message)
    res.status(500).json({ success: false, message: "Server error"});
  }
});


/// IGNORE - NOT USED - example of CRUD
// router.get("/", async (req, res)=> {
//     try {
//         const users = await User.find({});
//         res.status(200).json({ success: true, data: users });
//     } catch (error) {
//         console.log("error in fetching users: ", error.message);
//         res.status(500).json({ success: false, message: "Server Error"})
//     }
// })

// router.post("/", async (req, res) => {
//     const user = req.body; 
    
//     if(!user.name || !user.email || !user.password || !user.age ) {
//         return res.status(400).json({ success:false, message: "Please provide all fields"})
//     }

//     const newUser = new User(user)

//     try {
//         await newUser.save();
//         res.status(201).json({success:true, data: newUser});
//     } catch (error) {
//         console.error("Error in creating user:", error.message)
//         res.status(500).json({success: false, message: "Server Error"})
//     }
// });

// router.put("/:id", async (req, res) => {
//     const {id} = req.params;

//     const user = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({success:false, message: "Invalid user id"})
//     }

//     try {
//         const updatedUser = await User.findByIdAndUpdate(id, user, {new:true});
//         res.status(200).json({ success:true, data: updatedUser })
//     } catch (error) {
//         res.status(500).json({success: false, message: "Server Error"})
//     }
// })


// router.delete("/:id", async (req, res)=> {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({success:false, message: "Invalid user id"})
//     }

//     try {
//         await User.findByIdAndDelete(id);
//         res.status(200).json({ success:true, message: "User deleted" });
//     } catch (error) {
//         res.status(500).json({success: false, message: "Server Error"})
//     }
// })

export default router