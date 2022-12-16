const { getUserDataFromDB, updateUser } = require("./services/profile");
const authorize = require('./services/login.js')
const app = require("./connect_express.js");

const httpServer = require('http').createServer(app);
var io = require('socket.io')(httpServer);

// require("./connect_express.js");
require("./controllers/calendar");
require("./controllers/login");
require("./controllers/profile");
require("./controllers/message")

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('chatter', (message) => {
      console.log('GET chatter : ', message)
    //   getUserDataFromDB()
      io.emit('chatter', message)
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