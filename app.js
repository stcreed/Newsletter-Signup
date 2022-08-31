//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

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
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us9.api.mailchimp.com/3.0/lists/0b92257e4c";

  const options = {
    method: "POST",
    auth: "sam1:-us9"
  }

  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});

app.listen(3000, function() {
  console.log("server is running on port 3000");
});

//ffe79e9c1fbc0a0b0406edd8144526a4 - us9;

//0b92257e4c
