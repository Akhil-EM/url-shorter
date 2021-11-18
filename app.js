require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");

const port = process.env.PORT;

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// application configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());
app.use(morgan("tiny")); //logs request-endpoint and time taken
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    console.log("db connection success");
  })
  .catch((err) => {
    console.log("db connection error" + err);
  });

app.use("/",require("./routes/index"))


//no router found will trigger this by default
app.all("*", (req, res) => {
  res.status(statusCodes.not_found)
     .json(responseModel("failed","requested api is not found"))
});

app.listen(port, () => console.log(`\napplication is running at ${port}`));