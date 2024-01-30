import { signup, login } from "./repository.js";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static("public"));

// Create application/json parser
let jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/static/index.html"));
});

// User dashboard
app.get("/user/:userId", (req, res) => {
  console.log(req.params.userId);
  res.sendFile(path.join(__dirname, "../public/static/userDashboard.html"));
});

// API mapping
app.post("/api/signup/", urlencodedParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  let user_uid = await signup(
    req.body.email,
    req.body.password,
    req.body.username
  );

  res.redirect("/user/" + user_uid);
});

app.post("/api/login/", urlencodedParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  let user_uid = await login(req.body.email, req.body.password);

  res.redirect("/user/" + user_uid);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
