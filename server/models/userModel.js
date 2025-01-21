const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true  // Ensure email is unique
    },
    username: {
        type: String,
        required: true,
        unique: true  // Ensure username is unique
    }
});

module.exports = mongoose.model('User', userSchema);
