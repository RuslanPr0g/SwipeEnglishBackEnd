const express = require('express');
const users = express.Router();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

let User = require('../models/user.model');

users.use(cors())

process.env.SECRET_KEY = 'secret';

users.route('/').get((req, res) => {
  User.find()
      .then(users => res.json(users))
      .catch(err => res.status(400).json('Error: ' + err));
});

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then(user => {
              res.json({ error: 'Registered!' })
            })
            .catch(err => {
              res.json({ error: 'error'})
            })
        })
      } else {
        res.json({ error: 'error'})
      }
    })
    .catch(err => {
      res.json({ error: 'error'})
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            username: user.username,
            email: user.email
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send(token)
        } else {
          // Passwords don't match
          res.json({ error: 'Wrong Password' })
        }
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.route('/add-word/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
          if(user['kwords'].indexOf(req.body.data.word) === -1)
          {
          user['kwords'].push(req.body.data.word)

          user.save()
            .then(() => res.json('Word Memorized!'))
            .catch(err => res.status(400).json('Error1: ' + err));
          }
          else
          {
            user.save()
            .then(() => res.json('Word Exists! (but document saved)'))
            .catch(err => res.status(400).json('Error1: ' + err));
          }
        })
        .catch(err => res.status(400).json('Error2: ' + err));
})

users.route('/delete-word/:id').delete((req, res) => {
  User.findById(req.params.id)
      .then(user => {
        const needed_word = user['kwords'].indexOf(req.body.word);
        if(needed_word !== -1)
        {
          user['kwords'].splice(needed_word, 1)
          // props.words.filter(el => el !== this.word) // another variant
          user.save()
            .then(() => res.json('Word Forgotten!'))
            .catch(err => res.status(400).json('Error1: ' + err));
        }
        else
        {
          user.save()
          .then(() => res.json('Word Not Found! (but document saved)'))
          .catch(err => res.status(400).json('Error1: ' + err));
        }
      })
      .catch(err => res.status(400).json('rrror: ' + err))
})


users.get('/get-words/:id', (req, res) => {
  User.findById(req.params.id)
    .then(_words => res.json(_words.kwords))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = users;