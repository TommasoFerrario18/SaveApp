import {signup} from "./repository.js";
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static('public'));

// Create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/static/index.html"));
});

app.post("/api/signup/", urlencodedParser, async(req, res) => {
  if (!req.body) return res.sendStatus(400);

  user_uid = await signup(req.body.email, req.body.password, req.body.username);

  res.redirect("/user/" + user_uid);
});

app.get("/user/:userId(\d+)", (req, res) => {
  console.log(req.params.userId);
  res.sendFile(path.join(__dirname, "../public/static/userDashboard.html"));
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
