

// set up server
const express = require('express')
const app = express();
const PORT = 9013;

const path = require('path')
const bodyParser = require('body-parser')
const querystring = require('querystring')
const url = require('url')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const fs = require('fs')
const http = require('http');


// connect to database
const DB = require('./DB/DbConn.js')

// - session variable
const session = require('express-session')

app.set('trust proxy', 1)

app.use(session({
    secret: 'secret-secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    },
}))



http.createServer(app).listen(PORT, () => console.log(`http server listening on port ${PORT}`))

