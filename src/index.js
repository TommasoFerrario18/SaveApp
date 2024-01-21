import {signup} from "./repository.js";

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static('public'));

// Create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/static/index.html"));
});

app.post("/signup/", urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  signup(req.body.email, req.body.password, req.body.username);

  res.send("Sign up");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
