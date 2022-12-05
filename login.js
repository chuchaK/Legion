const { resolve } = require('path');
const path = require('path');

const app = require('./connect_express.js')
const connection = require('./connect_sql.js')

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

async function getUserDataFromDB(email) {
	let userData;
	let promise = new Promise((resolve, reject) => {connection.query('SELECT * FROM users WHERE email = ?', [email], function(error, results, fields) {
		// If there is an issue with the query, output the error
		if (error) throw error;
		// If the account exists
		if (results.length > 0) {
			userData = {
				email: results[0].email,
				first_name: results[0].first_name,
				last_name: results[0].last_name,
				team_name: results[0].team_name,
			};
			resolve(userData);
		}
	})});
	return promise;
}

function htmlEditUserData(data) {
	document.getElementById('first-name-text').innerHTML = data.first_name;
	document.getElementById('last-name-text').innerHTML = data.last_name;
	document.getElementById('team-text').innerHTML = data.team_name;
	document.getElementById('email-name-text').innerHTML = data.email;
}

// http://localhost:3000/home
app.use('/home', async function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		const email = request.session.email;
		if (email) {
			const userData = await getUserDataFromDB(email);
			console.log('3',userData)
			if (userData) {
				// Вставка данных в html
				response.sendFile(path.join(__dirname + '/Profile.html'));
				htmlEditUserData(userData);
			} else {
				response.send('Such user does not exist!');
				response.end();
			}
		} else {
			response.send('Session not have email!');
			response.end();
		}
	} else {
		// Not logged in
		response.redirect('/');
	}
});

app.listen(3000);