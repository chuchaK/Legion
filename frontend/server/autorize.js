const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // Применяем стратегию(В нашем случае username & password)
const mysql = require('mysql');


//Подключаемся к базе данных
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

//Назначаем id сессии
passport.serializeUser(function(user, done) {
		console.log("Serialize: ", user[0].id);
		done(null, user[0].id);
	});

    //Получаем id пользователя
	passport.deserializeUser(function(id, done) {
                //Строим запрос в базу данных(ищем id пользователя,полученного из стратегии)
	  	connection.query("SELECT * FROM users WHERE user_id='"+ id +"'",function(err,res){
	  		console.log(id);	
			done(null, id);
		});
	
	});
        //Заменяем стандартный атрибут username usernameField: 'email'
        //Получаем данные переданные методом POST из формы email/password
        //Параметр done работает на подобии return он возвращает пользователя или false в зависимости прошел ли пользователь аутентификацию
        passport.use(new LocalStrategy({	usernameField: 'email'	},
		function(email, password, done) {

                        //Строим запрос в базу данных, ищем пользователя по email переданному из формы в стратегию
		  	connection.query("SELECT * FROM users WHERE email='" + email + "'",	function(err,res){
                                //Если количество результатов запроса(пользователей с таким email) меньше 1,выводим в консоль что он не существует
				if (res.length < 1) {

					console.log('User not found');
					return done(null,false);
				}
                                //Иначе передаем выводим найденый email в консоль и передаем пользователя функцией done в сессию
				else {

					console.log(res[0].email);
                    console.log("User was autorise!")
					return done(null,res);

				}

			});
		}
	))