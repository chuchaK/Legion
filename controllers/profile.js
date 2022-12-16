const app = require("../connect_express.js");
const { createUser } = require("../services/profile");
const { authorize } = require("../services/login");
const { getUserDataFromDB, updateUser } = require("../services/profile");

// http://localhost:3000/profile
app.get("/profile", async function (request, response) {
  const userProfile = await getUserDataFromDB(request.session.email);
  response.render("profile", { profile: userProfile });
});

app.get("/profile/new", function (request, response) {
  // Render login template
  response.render("profileNew");
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

app.post("/profile", async function (request, response) {
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
