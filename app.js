const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@cluster0.t4ao8.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .catch((err) => console.log(err))
  .finally(console.log("Mongoose connected."));

app.use("/", require("./routes"));

module.exports = app;