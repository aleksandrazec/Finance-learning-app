


const mysql = require('mysql2')

const conn = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
});


let dataPool = {}


// 1
// User

// add user

// validate user


// update daily streak - if last_streak_day != today


// end User


// 2
// Course

// Create Course

// Get Course info

// Get all course list

// end Course

// 3
// Lecture

// create lecture

// get all lectures of a certain course

// get 1 lecture

// end Lecture


// 4
// Quiz

// create quiz

// get quizes of a certain course

// get 1 quiz

// end Quiz


// 5
// Game

// create game

// get games of a certain course

// get 1 game

// end Game

// 6
// Stock

// add 1 stock


// add a batch of stocks


// get stocks?

// end Stock