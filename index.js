'use strict'

const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const port = process.env.PORT || 5001

// db module
const db = require('./db')
db.connect({
  database: process.env.DB_NAME || 'cualquiera',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'microsoft',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  operatorsAliases: false
})

// Custom event emitter
const eventEmitter = require('events')
class CustomEvent extends eventEmitter {}
const myEvent = new CustomEvent()

// socket connection
io.on('connection', socket => {
  myEvent.on('data', function (data) {
    socket.emit('data', data)
  })
})

// api
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', async (req, res) => {
  const { temperatura, humedad } = req.body
  if (!temperatura || !humedad) return res.status(500).send('error')

  const timestamp = getTime()

  try {
    await db.save({ temperatura, humedad, timestamp })
  } catch (err) {
    console.log(err)
    return res.status(500).send('some error ocurred')
  }

  myEvent.emit('data', { timestamp, temperatura, humedad })

  res.status(201).send('success')
})

const getTime = () => {
  const now = new Date()
  return `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`
}

http.listen(port, () => {
  console.log('corriendo en puerto ' + port)
})
