const app = require("../connect_express.js");

app.get("/calendar", function (request, response) {
  // Render login template
  response.render("calendar");
});
