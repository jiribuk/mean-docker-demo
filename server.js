// server.js
console.log('server starting')
/** Get dependencies */
const express = require('express')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

/** Get our API routes */
const api = require('./routes/api')

const app = express()

/** Parsers for POST data */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/** Set our api routes */
app.use('/', api)

/** Get port from environment and store in Express. */
const port = process.env.PORT || '3000'
app.set('port', port)

/** Create HTTP server. */
const server = http.createServer(app)

// MongoDB
// Set up default mongoose connection
mongoose.connect(process.env.MONGODB_URL, {
  useMongoClient: true
})

// Get the default connection
var db = mongoose.connection

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

/** Listen on provided port, on all network interfaces.  */
server.listen(port, () => console.log(`API running on localhost:${port}`))
