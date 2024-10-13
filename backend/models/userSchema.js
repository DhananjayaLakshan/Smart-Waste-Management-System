const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: { type: String, required: true, unique: true },
    Address: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    img: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
