const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const register = async (req, res) => {
  try {
    // Get user data from request body
    const { username, email, password } = req.body;
    //validation
    // for username
    if (!username) {
      return res.status(500).send({
        success: false,
        message: "Please provide a username.",
      });
    }
    if (!email) {
      return res.status(500).send({
        success: false,
        message: "Please provide an email.",
      });
    }
    if (!password) {
      return res.status(500).send({
        success: false,
        message: "Please provide a password.",
      });
    }
    // FOR ALL
    // if(!username || !email ||!password){
    //     return res.send({
    //         success:false,
    //         message:"Please provide all required fields: username, email, and password."
    //     })
    // }
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: " User already exists with this email.",
      });
    }

     const hashedPassword = await bcrypt.hash(password,10);
    // Save user
    const user = new User({
      username,
      email,
      password: hashedPassword, // Store the     hashed password
    });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User registered successfully.",
    });
    // OR

    // const user = await User.create({
    //     username,
    //     email,
    //     password
    // });

    console.log("Incoming data:", req.body);
  } catch (error) {
    console.error("Error in user registration:", error);
  }
};

const login = async (req, res) => {
  try {
    // get user ddata fro  rquest body
    const { email, password } = req.body;
    // validation
    
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password.",
      });
    }
    const registeredUser = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password,registeredUser.password);
    if(!isMatch){
        return res.status(400).send({
            success:false,
            message:"Invalid email or password.",
        })
    }

    const token = jwt.sign(
        {userID:registeredUser._id },
        process.env.JWT_KEY,
        {expiresIn:'1d'}
    )

    res.status(200).send({
      
        success:true,
        message:"User logged in successfully.",
        token,
        user:registeredUser
    })
    
    if (!registeredUser) {
      return res.status(404).send({
        success: false,
        message: "create a account first.",
      });
    }
    // if (user.password !== password) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Invalid email or password.",
    //   });
    // }
    return res.status(200).send({
      success: true,
      message: "User logged in successfully.",
      registeredUser,
    });
  } catch (error) {
    console.log("Error in user login:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { register, login };
