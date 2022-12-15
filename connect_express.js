const express = require("express");
const session = require("express-session");
const path = require("path");
const { checkLoggedIn } = require("./services/login");

const app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
// auth middleware
app.use((req, res, next) => {
  console.log("NELSON url", req.url);
  checkLoggedIn(req) || req.url === "/login" || req.url === "/profile/new"
    ? next()
    : res.redirect("/login");
});
// parse JSONs
app.set("view engine", "pug");
app.set("views", "./views");

module.exports = app;
