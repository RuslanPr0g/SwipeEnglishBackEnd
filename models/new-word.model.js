const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wordSchema = new Schema({
    word:
    {
        type: String,
        required: true,
        trim: true, // remove white-spaces
        unique: true
    },
    definition: 
    {
        type: String
    },
    partOfSpeech:
    {
        type: String
    },
    synonyms: 
    {
        type: Array
    },
    typeOf: 
    {
        type: Array
    }
}, { timestamps: true, versionKey: false }); 

module.exports = New_Word = mongoose.model('new_word', wordSchema);