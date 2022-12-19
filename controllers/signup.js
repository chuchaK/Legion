const app = require("../connect_express");
const { createUser } = require("../services/signup");
const { authorize } = require("../services/login");

app.get("/profile/new", function (request, response) {
  // Render login template
  response.render("signup");
});

app.post("/profile/new", async function (request, response) {
  console.log("vbnm");
  let password = request.body.password;
  let password_2 = request.body.password_2;

  if (password == password_2) {
    const createResult = await createUser(request);
    console.log("NELSON createResult", createResult);
    // if (createResult) {
    //   response.send("User create error!");
    //   response.end();
    // } else {
    //   authorize(req);
    //   response.render("profile");
    // }
    response.send("User created successfully!");
    response.end();
  } else {
    return response.redirect("/profile/new");
  }
});
