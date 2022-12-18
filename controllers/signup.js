const app = require("../connect_express");
const { createUser } = require("../services/signup");
const { authorize } = require("../services/login");

app.get("/profile/new", function (request, response) {
  // Render login template
  response.render("signup");
});

app.post("/signup", function (request, response) {
  let password = request.body.password;
  let password_2 = request.body.password_2;

  if (password == password_2) {
    const createError = createUser(request);
    if (createError) {
      response.send("User create error!");
      response.end();
    } else {
      authorize(req);
      response.render("profile");
    }
  } else {
    return response.redirect("/add_user");
  }
});
