const express = require('express');
const words = express.Router();
const cors = require('cors');

let Word = require('../models/word.model');

words.use(cors());

words.get('/', (req, res) => {
    Word.find()
        .then(words => res.json(words))
        .catch(err => res.status(400).json('Error: ' + err));
});

words.post('/addWord', (req, res) => {
    const wordData = {
        name: req.body.name,
        difficulty: req.body.difficulty,
        speech: req.body.speech
      }

    Word.create(wordData)
        .then(word => {
        res.json({ status: 'Word Added!' })
        })
        .catch(err => {
        res.json({ error: err.errmsg})
        })
});

module.exports = words;