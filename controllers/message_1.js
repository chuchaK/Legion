const express = require('express')
const app = express()
const connection = require('../connect_sql.js')

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 3000

app.use(function (request, result, next) {
    result.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/message', function(request, response) {
	// Render login template
  // console.log('Connected');
	response.render('message');
});


// io.on('connection', (socket) => {
//   socket.on('chatter', (msg) => {
//     console.log('user ' + socket.id + ": "  + msg);
//     connection.query("INSERT INTO message (message) VALUES ('" + msg + "')", (error, result) => {
//     	io.emit("chatter", {
//         	id: result.insertId,
//         	message: msg
// 		  });
//     });
//   });
// });

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('chatter', (message) => {
    console.log('chatter : ', message)
    io.emit('chatter', message)
  })
})

server.listen(port, () => {
  console.log('listening on PORT: ' + port);
});

// const express = require('express')
// const app = express()
// const path = require('path')

// const APP_PORT = 5555

// const server = app.listen(APP_PORT, () => {
//   console.log(`App running on port ${APP_PORT}`)
// })

// const { Server } = require("socket.io");
// const io = new Server(server);

// //app.set('views', path.join(__dirname, 'views'))
// //app.set('view engine', 'pug')

// //app.use(express.static('public'))

// app.get('/message', function(request, response) {
// 	// Render login template
//   console.log('Connected');
// 	response.render('message');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected')
//   socket.on('chatter', (message) => {
//     console.log('chatter : ', message)
//     io.emit('chatter', message)
//   })
// })

