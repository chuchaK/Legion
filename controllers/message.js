const app = require("../connect_express.js");
const { getUserDataFromDB, updateUser } = require("../services/profile");

app.get('/message', function(request, response) {
	// Render login template
  console.log("Start messenger")
  const userProfile = getUserDataFromDB(request.session.email);

	response.render('message_1', { profile : userProfile });
});