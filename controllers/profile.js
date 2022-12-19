const app = require("../connect_express.js");
const { createUser } = require("../services/profile");
const { authorize } = require("../services/login");
const { getUserDataFromDB, updateUser } = require("../services/profile");

// http://localhost:3000/profile
app.get("/profile", async function (request, response) {
  const userProfile = await getUserDataFromDB(request.session.email);
  response.render("profile", { profile: userProfile });
});

app.post("/profile/update", function (request, response) {
  console.log("NELSON request", request);
  console.log("NELSON request.session", request.session);
  // const updatedProfile = await updateUser(request.session.email);
  // console.log("NELSON updatedProfile", updatedProfile);
  response.send({
    first_name: "test",
    last_name: "test",
    team_name: "test",
    email: "test",
  });
  response.end();
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
    response.redirect("/login");
    response.end();
  } else {
    request.flash("info", "flash message");
    return response.render("signup", {
      successes: request.flash("info"),
    });
  }
});
