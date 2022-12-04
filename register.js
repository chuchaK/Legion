const path = require('path');
const { response } = require('./connect_express');
const app = require('./connect_express');
const connection = require('./connect_sql.js')

require('./login')

app.get('/register', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/SignUpPage.html'));
});

app.post('/add_user', function(req, response) {
	// console.log("Try to send to base!")

	let first_name = req.body.first_name
    let last_name = req.body.last_name
    let team_name = req.body.team_name
    let email = req.body.email;
	let password = req.body.password;
    let password_2 = req.body.password_2;
    let key_team = req.body.key_team

    // console.log(first_name)
    if (password == password_2)
    {
		console.log("Password correct")
        connection.query("INSERT INTO users (first_name, last_name, team_name, email, password, key_team) VALUES (?, ?, ?, ?, ?, ?)",
                        [first_name, last_name, team_name, email, password, key_team], function(error, res) {
                            // If there is an issue with the query, output the error
                            //console.log(res)
                            if(error)
                            {
                                console.log(error);
                            }
                            else
                            {
                                return response.redirect('/')
                            }
                    });
        
    }
    else
    {
        console.log("Please repeat your password one more time!")
        return response.redirect('/add_user')
    }
});

// app.get('/', function(request, response) {
// 	// Render login template
// 	response.sendFile(path.join(__dirname + '/loginPage.html'));
// });

