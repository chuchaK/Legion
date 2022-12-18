const app = require('./connect_express.js')

const APP_PORT = 5555

const server = app.listen(APP_PORT, () => {
    console.log(`App running on port ${APP_PORT}`)
  })

const io = require('socket.io').listen(server)
const path = require('path')



// const server = app.listen(APP_PORT, () => {
//   console.log(`App running on port ${APP_PORT}`)
// })


// ตั้งค่า เพื่อให้ express ทำการ render view ที่โฟลเดอร์ views
// และใช้ template engine เป็น pug
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//app.use(express.static('public'))

app.get('/message', (req, res) => {
  res.render('index')
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('chatter', (message) => {
    console.log('chatter : ', message)
    io.emit('chatter', message)
  })
})

// http.listen(APP_PORT, () => {
//     console.log('listening on PORT: ' + APP_PORT);
//   });
