import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Lecturers } from "../models/Lecturers.js";

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({error: "User already exists!"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        userName: username,
        email,
        password: hashedPassword
    })
    //console.log("hello 123",newUser)

    await newUser.save()
    return res.json({status:true, message: "User created successfully!"})

})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email})
    const userLecturers = await Lecturers.findOne({email})
    if(!user || !userLecturers){
        return res.status(400).json({error: "User does not exist!"})
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return res.status(400).json({error: "Password is incorrect!"})
    }

    const token = jwt.sign({
        username: user.userName, 
        email: user.email}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.cookie("token", token, {maxAge: 1000*60*60*24*7, httpOnly: true})
        return res.json({status: true, message: "User logged in successfully!"})

})


router.post("/forgot-password", async (req, res) => {

    const { email } = req.body;
    try {

        const user = await User.findOne({email})
        if(!user)
        {
            return res.status(400).json({error: "User does not exist!"})
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "7d"})

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'youquanyap3386@gmail.com',
              pass: 'avsr vczv vbwp eyea'
            }
          });
          
          var mailOptions = {
            from: 'youquanyap3386@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return res.status(400).json({error: "Error when sending email!"})
            } else {
                return res.json({status: true, message: "Email sent!"})
              //console.log('Email sent: ' + info.response);
            }
          });


    }catch (error) {
        console.log(error)
    }
})

router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const id = decoded.id;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate({_id:id}, {password: hashedPassword})
        return res.json({status: true, message: "Password reset successfully!"})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: "Invalid or expired link!"})
    }
})

export {router as userRouter}