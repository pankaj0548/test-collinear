const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering user' });
  }
};

const logout = function(req, res) {
  (async () => {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return res.status(400).json('Token not provided');
      }

      // Add token to blacklist
      // Implement TokenBlacklist model here

      res.json('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json('An error occurred while logging out');
    }
  })();
};


const login = async (req, res) => {
  try {
    console.log("valid Password", req.body)
    const { username, password } = req.body;
    console.log(username,password)
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};

module.exports = {logout, login, createUser};
