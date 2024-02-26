/**
 * @file This file contains the main server code for the SaveApp application.
 * It imports various modules, sets up the server, and defines the routes and handlers for different endpoints.
 * The server listens on port 3000.
 */

import { signup, login, logout } from "./userRepository.js";
import {
  addExpense,
  getTransactions,
  deleteExpense,
} from "./transactionRepository.js";
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static("public"));
app.use(cookieParser());

let jsonParser = bodyParser.json();

let urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * GET request handler for the root endpoint ("/").
 * Sends the home.html file to the client.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/static/home.html"));
});

/**
 * GET request handler for the "/user/" endpoint.
 * If the user is not logged in, redirects to the root endpoint ("/").
 * If the user is logged in, sends the dashboard.html file to the client.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/user/", (req, res) => {
  if (!req.cookies.user_uid) return res.redirect("/");

  res.cookie("user_uid", req.cookies.user_uid);
  res.sendFile(path.join(__dirname, "../public/static/dashboard.html"));
});

/**
 * GET request handler for the "/api/logout/" endpoint.
 * If the user is not logged in, sends a 400 status code.
 * Calls the logout function from the userRepository module.
 * Clears the user_uid cookie and redirects to the root endpoint ("/").
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/api/logout/", (req, res) => {
  if (!req.cookies.user_uid) return res.sendStatus(400);

  let user = logout();

  res.clearCookie("user_uid");
  res.redirect("/");
});

/**
 * POST request handler for the "/api/signup/" endpoint.
 * Parses the request body and calls the signup function from the userRepository module.
 * Sets the user_uid cookie and redirects to the "/user/" endpoint.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post("/api/signup/", urlencodedParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  let user_uid = await signup(
    req.body.email,
    req.body.password,
    req.body.username
  );

  res.cookie("user_uid", user_uid);

  res.redirect("/user/");
});

/**
 * POST request handler for the "/api/login/" endpoint.
 * Parses the request body and calls the login function from the userRepository module.
 * Sets the user_uid cookie and redirects to the "/user/" endpoint.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post("/api/login/", urlencodedParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  let user_uid = await login(req.body.email, req.body.password);

  res.cookie("user_uid", user_uid);
  res.redirect("/user/");
});

/**
 * GET request handler for the "/api/transactions/" endpoint.
 * If the user is not logged in, sends a 400 status code.
 * Calls the getTransactions function from the transactionRepository module.
 * Sends the transactions data as the response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.get("/api/transactions/", async (req, res) => {
  if (!req.cookies.user_uid) return res.sendStatus(400);

  let transactions = await getTransactions(req.cookies.user_uid);

  res.send(transactions);
});

/**
 * POST request handler for the "/api/transaction" endpoint.
 * Parses the request body and checks if the user is logged in.
 * Calls the addExpense function from the transactionRepository module.
 * Redirects to the "/user/" endpoint.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post("/api/transaction", jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (!req.cookies.user_uid) return res.sendStatus(400);

  await addExpense(req.body, req.cookies.user_uid);

  res.redirect("/user/");
});

/**
 * DELETE request handler for the "/api/transactions/:year/:id" endpoint.
 * If the user is not logged in, sends a 400 status code.
 * Calls the deleteExpense function from the transactionRepository module.
 * Sends a 200 status code as the response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.delete("/api/transactions/:year/:id", async (req, res) => {
  if (!req.cookies.user_uid) return res.sendStatus(400);

  let document = await deleteExpense(
    req.params.id,
    req.params.year,
    req.cookies.user_uid
  );

  console.log(document);

  res.sendStatus(200);
});

/**
 * Starts the server and listens on port 3000.
 * Logs a message to the console when the server is listening.
 */
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
