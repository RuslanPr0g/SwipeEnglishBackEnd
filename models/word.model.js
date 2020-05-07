const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    name:
    {
        type: String,
        required: true,
        trim: true, // remove white-spaces at the end
        unique: true
    },
    difficulty:
    {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true }); 

module.exports = Word = mongoose.model('Word', wordSchema);