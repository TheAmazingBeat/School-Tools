const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/favicon.ico", function (req, res) {
  res.sendFile(__dirname + "/favicon.ico");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/hw-prior.html", function (req, res) {
  res.sendFile(__dirname + "/public/src/hw-prior.html");
});

app.get("/calculator.html", function (req, res) {
  res.sendFile(__dirname + "/public/src/calculator.html");
});

app.get("/planner.html", function (req, res) {
  res.sendFile(__dirname + "/public/src/planner.html");
});

app.listen(process.env.PORT || 5000, function () {
  console.log("Server is running");
});
