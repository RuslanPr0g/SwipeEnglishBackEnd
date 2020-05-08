const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:
    {
        type: String,
        required: true,
        trim: true, // remove white-spaces
        min: 5,
        max: 20,
        unique: true
    },
    email: 
    {
        type: String,
        trim: true,
        required: true,
        max: 30,
        unique: true
    },
    password: 
    {
        type: String,
        required: true,
        min: 5
    },
    date: 
    {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

module.exports = User;