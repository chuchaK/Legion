const { getUserDataFromDB, updateUser } = require("./services/profile");
const authorize = require('./services/login.js')
const app = require("./connect_express.js");
const connection = require('./connect_sql.js')

const httpServer = require('http').createServer(app);
var io = require('socket.io')(httpServer);

require("./controllers/calendar");
require("./controllers/login");
require("./controllers/profile");
require("./controllers/message");
require("./controllers/signup")

io.on('connection', (socket) => {
    console.log('User was connected')

    //Upload all messages
    socket.on('all_msg', (message) => {
      connection("SELECT * FROM message", (error, messages) => {
        let result_1 = Object.values(JSON.parse(JSON.stringify(messages)));
          io.emit("all_msg", result_1)
      });
    });
    
    //Add new message to data base
    socket.on('chatter', (message) => {
      console.log('One msg: ', message)
      connection("INSERT INTO message (user_from, message) VALUES ('user', ?)", [message], (error, result) => {
        io.emit("chatter", message)
      });
    })
})

httpServer.listen(3000, (err)=>{
    if (err)
    {
        console.log("Problems on server!");
    }
    else
    {
        console.log("Server connected on port " + 3000);
    }
});