const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Address: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    img: { type: String, required: false },
    // location: {
    //     type: { type: String, enum: ['Point'], required: true },
    //     coordinates: { type: [Number], required: true }
    // },
    isAdmin: { type: Boolean, required: false }
});

// userSchema.index({ location: '2dsphere' }); // Still commented out as location is not used

const User = mongoose.model('User', userSchema);

module.exports = User;
