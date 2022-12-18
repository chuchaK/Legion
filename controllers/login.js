const app = require("../connect_express.js");
const { authorize, unauthorize, checkLoggedIn } = require("../services/login");

// http://localhost:3000/
app.get("/login", function (request, response) {
  // Render login template
  checkLoggedIn(request)
    ? response.redirect("/profile")
    : response.render("login");
});

app.get("/logout", function (request, response) {
  // Render login template
  unauthorize(request);
  response.redirect("/login");
});

// http://localhost:3000/auth
app.post("/login", async function (request, response) {
  // Capture the input fields
  let email = request.body.email;
  let password = request.body.password;

  // Ensure the input fields exists and are not empty
  if (email && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    await authorize(request);
    if (request.session.loggedIn) {
      response.redirect("/profile");
    } else {
      response.send("Incorrect Username and/or Password!");
      response.end();
    }
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});
