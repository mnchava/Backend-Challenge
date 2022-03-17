const express = require("express");
const app = express();
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@cluster0.t4ao8.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true}
).then(console.log("Mongoose connected."));

//Configurando las rutas
app.use("/", require("./routes"));

app.listen(4000, () => {
  console.log(`Server listening on port 4000`);
});
