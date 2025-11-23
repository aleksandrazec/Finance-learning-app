

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

app.use((req, res, next) => {
  const allowedOrigin = 'http://localhost:3000';
  
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true'); // This is crucial
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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


// importing routes
const user = require('./routes/user.js')
app.use('/user', user)

const course = require('./routes/course.js')
app.use('/course', course)

const lecture = require('./routes/lecture.js')
app.use('/lecture', lecture)

const quiz = require('./routes/quiz.js')
app.use('/quiz', quiz)

const game = require('./routes/game.js')
app.use('/game', game)

const stock = require('./routes/stock.js')
app.use('/stock', stock)

http.createServer(app).listen(PORT, () => console.log(`http server listening on port ${PORT}`))

