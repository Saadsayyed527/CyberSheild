const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// You should keep this secret in an env variable in real apps
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.registerUser = async (req, res) => {
  const { name, email, username } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or Username already exists' });
    }

    const newUser = new User({ name, email, username });
    await newUser.save();

    // ✅ Create JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // ✅ Respond with user and token
    res.status(201).json({
      user: {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username
      },
      token
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Duplicate field detected' });
    }
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
