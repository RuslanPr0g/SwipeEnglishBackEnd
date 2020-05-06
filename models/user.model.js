const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:
    {
        type: String,
        required: true,
        trim: true, // remove white-spaces at the end
        minlength: 5
    },
    email: 
    {
        type: String,
        required: true,
        unique: true
    },
    password: 
    {
        type: String,
        required: true,
        minlength: 6
    },
    date: 
    {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

module.exports = User;