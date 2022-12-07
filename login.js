
const { resolve } = require('path');
const path = require('path');

const app = require('./connect_express.js')
const connection = require('./connect_sql.js')

const profile = require('./profile.js');

require('./register.js')

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/loginPage.html'));
});

// http://localhost:3000/auth
app.post('/login', function(request, response) {
	// Capture the input fields
	let email = request.body.email;
	let password = request.body.password;

	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
                request.session.loggedin = true;
                request.session.email = email
                request.session.username = results[0].first_name
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

// http://localhost:3000/home
app.use('/home', async function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/Profile.html'));
		const email = request.session.email;
		// profile.main(email);
	} else {
		// Not logged in
		response.redirect('/');
	}
});

app.get('/profile.js', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/profile.js'));
});

app.get('/calendar', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/Calendar.html'));
});

app.get('/profile', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/Profile.html'));
});

app.get('/message', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/Message.html'));
});

app.listen(3000);