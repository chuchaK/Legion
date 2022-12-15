const app = require('../connect_express.js')

app.get('/message', function(request, response) {
	// Render login template
	response.render('message');
});