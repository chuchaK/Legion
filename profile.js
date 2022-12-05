
// const app = require('./connect_express.js')
// const connection = require('./connect_sql.js')

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
	document.getElementById('team-text').innerHTML = data._name;
	document.getElementById('email-name-text').innerHTML = data.email;
}

module.exports = async function main(email) {
	console.log(request.session);
	if (email) {
		const userData = await getUserDataFromDB(email);
		console.log('3',userData)
		if (userData) {
			// Вставка данных в html
			htmlEditUserData(userData);
		} else {
			console.error('Such user does not exist!');
		}
	} else {
		console.error('Session not have email!');
	}
};
