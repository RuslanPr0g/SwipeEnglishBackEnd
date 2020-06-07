const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/*Adds the react production build to serve react requests*/
app.use(express.static(path.join(__dirname, "../Swipe English/src")));
/*React root*/
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../Swipe English/src/index.js"));
});

const uri = process.env.ATLAS_URI;

mongoose.set("useUnifiedTopology", true);
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

mongoose.connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
const wordsRouter = require("./routes/words-route");
const getRandomWord = require("./routes/random-word");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
app.use("/words", wordsRouter);
app.use("/r-word", getRandomWord);

app.listen(port, () => {
  console.log(`Server run : ${port}`);
});
