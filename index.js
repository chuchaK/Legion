import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import pkg from 'express';
import { createServer } from 'http'
import { Server } from 'socket.io'
import { createConnection } from 'mysql'; 


const __dirname = dirname(fileURLToPath(import.meta.url))
const app = new pkg();
const server = createServer(app);
const io = new Server(server)
const port = process.env.PORT || 3000
const connection = createConnection({
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
		console.log("Success!")
	}
});

app.use(pkg.static(__dirname + '/public'));
app.use(function (request, result, next) {
    result.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/msg', (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/get_messages", function (request, result) {
    connection.query("SELECT * FROM message", function (error, messages) {
        // return data will be in JSON format
        let json = JSON.stringify(messages)
		// json  = json.replace(/[\u007F-\uFFFF]/g, function(chr) {
        // 	return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
        // })
		let obj = JSON.parse(json)
		let len = obj.length
		let str = ""
		for (let i = 0; i < len; i+=1)
		{
			str += obj[i].message
			str += "\n"
		}
		//console.log(str)
		result.end(str);
        
		
        
    });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('user ' + socket.id + ": "  + msg);
    connection.query("INSERT INTO message (message) VALUES ('" + msg + "')", (error, result) => {
    	io.emit("chat message", {
        	id: result.insertId,
        	message: msg
		  });
    });
  });
});

server.listen(port, () => {
  console.log('listening on PORT: ' + port);
});