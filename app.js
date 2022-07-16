//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

//have to use this to access the css file and images because it is saved locally, whereas the bootstrap stuff is server based so is loaded automatically.
app.use(express.static("public"));

//below is telling the system to use the urlencoded part within bodyparser
app.use(bodyParser.urlencoded({extended: true}));

//specify the route, specify callback function, response is to send file as the directory name plus the file name.
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

//using "/" is telling it to target the home route.
app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  console.log(firstName, lastName, email);
});

app.listen(3000, function() {
  console.log("server is running on port 3000");
});
