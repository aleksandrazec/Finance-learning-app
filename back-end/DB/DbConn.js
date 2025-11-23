


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
dataPool.addUser = (username, type, email, password) => {
    if(type < 0 || type > 1){
        // invalid enum value
        return -1
    }
    return new Promise((resolve, reject) => {
        conn.query("INSERT INTO User (username, type, email, password, last_streak_day, current_streak) VALUES (?, ?, ?,  ?, CURRENT_DATE, 1);", [username, type, email, password], (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// get user info
dataPool.getUser = (username) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM User WHERE username = ?", username, (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// validate user
// - if empty return result - invalid user
// - if non-empty return result - valid user
dataPool.validateUser = (username, password) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM User WHERE username = ? AND password = ?", [username, password], (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}


// TODO - update daily streak - if last_streak_day != today
dataPool.updateDailyStreak = (username) => {
    
}

// end User


// 2
// Course

// Create Course
dataPool.createCourse = (title, advisor_id, difficulty, description, structure_file_name) => {
    return new Promise((resolve, reject) => {
        conn.query("INSERT INTO Course (title, advisor_id, difficulty, description, structure_file) VALUES (?, ?, ?, ?, ?)", [title, advisor_id, difficulty, description, structure_file_name] , (err, res) => {
                if(err){
                    return reject(err)
                }
                return resolve(res)
            })
    })
}

// Get Course info
dataPool.getCourse = (id) => {
    return new Promise((resolve, reject) => {  
        conn.query("SELECT * FROM Course WHERE id = ?", id, (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

dataPool.getCourseByAdvisor = (id) => {
    return new Promise((resolve, reject) => {  
        conn.query("SELECT * FROM Course WHERE advisor_id = ?", id, (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}
// Get all course list
dataPool.getAllCourses = () => {
    return new Promise((resolve, reject) => {  
        conn.query("SELECT * FROM Course", id, (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// end Course

// 3
// Lecture

// create lecture
dataPool.createLecture = (title, text_file, course_id) => {
    return new Promise((resolve, reject) => {  
        conn.query("INSERT INTO Lecture (title, text_file, course_id) VALUES (?, ?, ?);", [title, text_file, course_id], (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// get all lectures of a certain course
dataPool.getCourseLectures = (course_id) => {
    return new Promise((resolve, reject) => {  
        conn.query("SELECT * FROM Lecture WHERE course_id = ?", course_id, (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// get 1 lecture
dataPool.getLecture = (id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM Lecture WHERE id = ?", id, (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// end Lecture


// 4
// Quiz

// create quiz
dataPool.createQuiz = (course_id, question, answer, alt_option1, alt_option2, alt_option3) => {
    return new Promise((resolve, reject) => {  
        conn.query("INSERT INTO Quiz (course_id, question, answer, op1, op2, op3) VALUES (?, ?, ?, ?, ?, ?);", [course_id, question, answer, alt_option1, alt_option2, alt_option3], (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// get quizes of a certain course
dataPool.getCourseQuizes = (course_id) => {
    return new Promise((resolve, reject) => {  
        conn.query("SELECT * FROM Quiz WHERE course_id = ?", course_id, (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// get 1 quiz
dataPool.getQuiz = (id) => {
    return new Promise((resolve, reject) => {  
        conn.query("SELECT * FROM Quiz WHERE id = ?", id, (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// end Quiz


// 5
// Game

// create game
dataPool.createGame = (course_id, living_cost, start_money, start_date) => {
    return new Promise((resolve, reject) => {  
        conn.query("INSERT INTO Game (course_id, living_cost, start_money, start_date) VALUES (?, ?, ?, ?);", [course_id, living_cost, start_money, start_date], (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// get games of a certain course
dataPool.getCourseGames = (course_id) => {
    return new Promise((resolve, reject) => {  
        conn.query("SELECT * FROM Game WHERE course_id = ?", course_id, (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// get 1 game
dataPool.getGame = (id) => {
    return new Promise((resolve, reject) => {  
        conn.query("SELECT * FROM Game WHERE id = ?", id, (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// end Game

// 6
// Stock
dataPool.getCompanyName = (date) => {
    return new Promise((resolve, reject) => {  
        conn.query("SELECT Company, Close FROM Stock WHERE Date = ?", date, (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}
// add 1 stock
dataPool.addStock = (date, close, volume, company) => {
    return new Promise((resolve, reject) => {
        conn.query("INSTERT INTO Stock (Date, Close, Volume, Company) VALUES (?, ?, ?, ?)", [date, close, volume, company], (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// add a batch of stocks
// text is formatted in proper route
dataPool.addStocksBatch = (values_text_formatted) => {
    return new Promise((resolve, reject) => {
        conn.query("INSTERT INTO Stock (Date, Close, Volume, Company) VALUES " + values_text_formatted, (err, res) => {
            if(err){
                return reject(err)
            }
            return resolve(res)
        })
    })
}

// get stocks?

// end Stock


module.exports = dataPool;