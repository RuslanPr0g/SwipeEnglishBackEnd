const express = require('express');
const words = express.Router();
const cors = require('cors');

let Word = require('../models/word.model');

words.use(cors());

words.get('/', (req, res) => {
        Word.aggregate(
            [ { $sample: { size: 1 } } ]
         ).then(word => res.json(word))
         .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = words;