'use strict';


//For autorize
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const passport = require('passport');
/* ---------------------------*/

const express = require('express');
//const morgan = require('morgan');
const path = require('path');
const app = express();
const publicFolder = path.resolve(__dirname, '..', 'public');

const PORT = 8000;

//app.use(morgan('dev'));
app.use(express.static(publicFolder));

//Autorize block
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Инициализируем сессию
app.use(
	session({
		secret: "secret", //Задаем ключ сессий
		store: new FileStore(), //Указываем место хранения сессий(Используя этот пакет,у вас будет создана папка sessions, в которой будут хранится сессии и, даже если сервер перезагрузится,пользователь останется авторизованным
		cookie: {
			path: "/",
			httpOnly: true, // path - куда сохранять куки, httpOnly: true - передача данных только по https/http,maxAge - время жизни куки в миллисекундах 60 * 60 * 1000 = 1 час 
			maxAge: 60 * 60 * 1000
		},
		resave: false,
		saveUnitialized: true
	})
);

require('./autorize.js');

app.use(passport.initialize()); //Инициализируем паспорт
app.use(passport.session()); //Синхронизируем сессию с паспортом
//Проверяем если авторизован - пропускаем дальше,если нет запрещаем посещение роута
const logout = (req,res,next) => {
	if(req.isAuthenticated()) {
		return res.redirect('/admin');
	} else {
		next()
	}
}

//Подключаем нашу форму
app.all('/*', (req, res) => {
    res.sendFile(path.resolve(`${publicFolder}/LoginPage.html`));
});
//При POST запросе проверяем передан ли пользователь, если да - пропускаем,если нет - возвращаем к форме
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) {
    	return next(err);
    }
    if (!user) { 
    	return res.redirect('/');
    	console.log(user);
    }
    req.logIn(user, function(err) {
      if (err) { 
      	return next(err);
      }
      return res.redirect('/admin');
    });
  })(req, res, next);
});
/* ---------------------------*/

//Post request
//При POST запросе проверяем есть ли пользователь в базе, если да - возвращаем к форме и пишем в консоль что такой пользователь есть,если нет - регистрируем и перекидываем на авторизацию 
app.post('/register', function(req,res) {
    //INSERT INTO `users`(`user_id`, `first_name`, `last_name`, `team_name`, `email`, `password`, `key_team`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7])
	let first_name = req.first_name
    let last_name = req.last_name
    let team_name = req.team_name
    let email = req.body.email;
	let password = req.body.password;
    let password_2 = req.body.password_2;
    let key_team = req.key_team

    if (password == password_2)
    {
        connection.query("INSERT INTO users(first_name, last_name, team_name, email, password, key_team) VALUES (" + first_name + "," +
                    last_name + "," +
                    team_name + "," +
                    email + "," +
                    password + "," +
                    key_team + "," +
                    ")");
    }
    else
    {
        console.log("Please repeat your password one more time!")
    }
    
	/*connection.query("SELECT * FROM users WHERE email = '" + email + "'",	function(err,res){

		if (res.length < 1) {

			connection.query("INSERT INTO users (email,password) VALUES('" + email + "','" + password + "')", function(err,res) {
		  	
			  	if(err) console.log(err);
			  	
			  	else {
			  		console.log(email)
			  	}

			});

		}

		else {

			console.log('user registered!');

		}

	});*/
	return res.redirect('/')
});

//Register
//При роуте /register подключаем форму регистрации
app.get('/register',logout, (req,res) => res.sendFile(`${publicFolder}/SignUpPage.html`))
//Проверяем если пользователь авторизован - пропускаем,если нет - возвращаем к форме
const auth = (req,res,next) => {
	if(req.isAuthenticated()) {
		next()
	} else {
		return res.redirect('/');
	}
}
//Если пользователь прошел аутентификацию - что-то делаем,я вывожу сообщение "Admin page"
app.get('/admin', auth, (req, res) => {
	res.sendFile(`${publicFolder}/Profile.html`);
});
//Если роут /logout выкидываем пользователя из сессии и перекидываем на форму
app.get('/logout', (req,res) => {
	req.logout();
	res.redirect('/');
});


app.listen(PORT, () => {
    console.log(`Server listening port ${PORT}`);
});
