const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
    const { name, email, username } = req.body; // Expecting username as well
    try {
        // Check if email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(400).json({ message: 'Email or Username already exists' });
        }

        // Create new user
        const newUser = new User({ name, email, username });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        // Return more specific error for duplicate key issues
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Duplicate field detected' });
        }
        res.status(500).json({ message: 'Server error', error: err });
    }
};
