const express = require("express");
const session = require("express-session");
const path = require("path");
const { checkLoggedIn } = require("./services/login");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secret key"));
app.use(express.json());
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
// auth middleware
app.use(function (req, res, next) {
  res.locals.success_messages = req.flash("success_messages");
  res.locals.error_messages = req.flash("error_messages");
  next();
});
app.use((req, res, next) => {
  // console.log("NELSON url", req.url);
  checkLoggedIn(req) || req.url === "/login" || req.url === "/profile/new"
    ? next()
    : res.redirect("/login");
});
// parse JSONs
app.set("view engine", "pug");
app.set("views", "./views");

module.exports = app;
