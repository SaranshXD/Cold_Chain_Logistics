import express from "express"
const router = express.Router()
const app = express()
import cors from "cors"
import crypto from "crypto";
import nodemailer from "nodemailer";
// import auth from "./path/auth.js"
// import invdata from "./path/invdata.js"
// import mongoose, { connect } from "mongoose"
import User from "../models/user.js"
import jwt from 'jsonwebtoken'
// import fetchUser from './fetchUser.js'

app.use(cors())

router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ status: "error", message: "User already exists" });
      }
  
      const user = await User.create({
        name,
        email,
        password, // Storing plain text (not recommended for production)
        role,
      });
  
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        "secret123" // Use an environment variable for secret in production
        
      );
  
      res.json({ status: "ok", token });
    } catch (err) {
      res.status(500).json({ status: "error", message: "Something went wrong" });
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email, password }); // Direct plain-text matching
      if (!user) {
        return res.status(400).json({ status: "error", message: "Invalid credentials" });
      }
  
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        "secret123"// Use an environment variable for secret in production
        
      );
  
      res.json({ status: "ok", token });
    } catch (err) {
      res.status(500).json({ status: "error", message: "Something went wrong" });
    }
  });




  router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Generate a reset token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const tokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
  
      // Update user record with reset token and expiry
      user.resetToken = resetToken;
      user.tokenExpiry = tokenExpiry;
      await user.save();
  
      // Send email with the reset link
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sharusaransh@gmail.com", // Replace with your email
          pass: "totw pieo bnlu zzfd", // Replace with your password or app password
        },
      });
  
      const resetLink = `http://localhost:3000/reset-password/${resetToken}`;
      const mailOptions = {
        from: "sharusaransh@gmail.com",
        to: user.email,
        subject: "Password Reset Request",
        text: `Click on the following link to reset your password: ${resetLink}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.json({ success: true, message: "Password reset link sent to your email" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error sending reset email" });
    }
  });
  
  // Reset Password Route
  router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      const user = await User.findOne({
        resetToken: token,
        tokenExpiry: { $gt: Date.now() }, // Ensure token is not expired
      });
  
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired token" });
      }
  
      user.password = password; // Replace this with hashing logic
      user.resetToken = undefined;
      user.tokenExpiry = undefined;
      await user.save();
  
      res.json({ success: true, message: "Password has been reset successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error resetting password" });
    }
  });
  

// router.post('/api/dash1', async (req,res)=>{
//     // token=body.req.token
//     console.log(req.body.token)
//     const token= localStorage.getItem('token')
//     console.log(token)
    
    

    // if(token){
    //     const data =  await jwt.verify(token, 'secret123');
    //      res.json(data)
    // }

    // if (!req.body.token)
    // {
    //     return res.status(401).json({error : "Please authenticate using valid token "})
    // }
    //wqdqw
    

    // } catch (error) {
    //     return res.status(401).json({error : "Please authenticate using valid token "})
    // }
    // const userinfo = await req.user
    // console.log(userinfo)
    // return res.json(userinfo)

       
    
// })
export default router