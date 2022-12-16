const app = require("../connect_express.js");
const { getUserDataFromDB, updateUser } = require("../services/profile");


app.get('/message', function(request, response) {
	// Render login template
  const userProfile = getUserDataFromDB(request.session.email);
  console.log("Email of connected user: " + request.session.email)
	response.render('message_1', {message_1 : userProfile});
});