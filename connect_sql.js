const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "server133.hosting.reg.ru",
    user: "u1759984_default",
    password: "4nUq2y3U3c698CrD",
    database: "u1759984_default"
});

connection.connect(function (error) {
	if (error)
	{
		console.log('Database error!')
	}
	else
	{
		console.log("DB Success!")
	}
});


module.exports = connection