const express = require('express')
const fs = require('fs').promises
const path = require('path')
const course = express.Router()

const db = require('../DB/DbConn.js')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// get all courses
course.get('/list', async (req, res, next) => {
    try{
        const queryResult = await db.getAllCourses()
        res.json(queryResult)
    }catch(err){
        console.log("Error at /course/list route:")
        console.log(err)
        res.sendStatus(500)
    }
})

// get course lectures
course.get('/:course_id/lecture', async (req, res, next) => {
    try{
        
        const { course_id } = req.params;

        const queryResult = await db.getCourseLectures(course_id)
        res.json(queryResult)
    }catch(err){
        console.log("Error at /course/:course_id/lecture route:")
        console.log(err)
        res.sendStatus(500)
    }
})

// get course quizes
course.get('/:course_id/quiz', async (req, res, next) => {
    try{
        
        const { course_id } = req.params;

        const queryResult = await db.getCourseQuizes(course_id)
        res.json(queryResult)
    }catch(err){
        console.log("Error at /course/:course_id/quiz route:")
        console.log(err)
        res.sendStatus(500)
    }
})

// get course games
course.get('/:course_id/game', async (req, res, next) => {
    try{
        
        const { course_id } = req.params;

        const queryResult = await db.getCourseGames(course_id)
        res.json(queryResult)
    }catch(err){
        console.log("Error at /course/:course_id/game route:")
        console.log(err)
        res.sendStatus(500)
    }
})

// get 1 course by id
course.get('/:id', async (req, res, next) => {
    try{
        
        const { id } = req.params;
        const queryResult = await db.getCourse(id)
        if(queryResult.length){
            res.json(queryResult[0])
        }else{
            res.sendStatus(404)
        }
        res.end()
    } catch(err){
        console.log("Error at /course/:id route:")
        console.log(err)
        res.sendStatus(500)
    }
})


// create a course
course.post('/', urlencodedParser, async (req, res) =>  {
    try{

        // todo - creating structure file
        console.log(req.body)
        const { title, advisor_id, difficulty, description, structure_file } = req.body;

        if(title && advisor_id && difficulty && description && structure_file){

            const queryResult = await db.createCourse(title, advisor_id, difficulty, description, structure_file)
            if(queryResult.affectedRows){
                res.status(200)
                res.send({ status : { success: true, message : "Successfully created a course!"}})

            }else{
                res.status(500)
                res.send({ status : { success: false, message : "Error while creating a course! Try again!"}})                
            }
        }else{
            console.log("Creating a course but missing a field!")
            res.status(204)
            res.send({ status : { success: false, message : "Missing one of the following fields: title, advisor_id, difficulty, description or structure_file!"}})
        }
        res.end()
    }catch(err){
        console.log("Error at post /course/ route:")
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = course;