const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use (cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server run : ${port}`);
})
