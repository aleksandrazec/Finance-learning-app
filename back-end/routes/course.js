const express = require('express')
const course = express.Router()
const fs = require('fs').promises; // Use promises for async operations
const path = require('path');
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

course.get('/list/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const queryResult = await db.getCourseByAdvisor(id)
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
course.post('/', urlencodedParser, async (req, res) => {
    try {
        console.log(req.body)
        const { title, advisor_id, difficulty, description } = req.body;

        if (title && advisor_id && difficulty && description) {
            
            // Generate filename for the structure file
            const timestamp = Date.now();
            const filename = `structure_${timestamp}_${title.replace(/\s+/g, '_')}.txt`;
            const filePath = path.join(__dirname, '../structure_files/', filename);
            
            const queryResult = await db.createCourse(title, advisor_id, difficulty, description, filename)
            
            if (queryResult.affectedRows) {
                // Create structure file after successful database insertion
                try {
                    // Ensure the directory exists
                    const structureDir = path.join(__dirname, '../structure_files/');
                    
                    // Create directory if it doesn't exist (with recursive option)
                    await fs.mkdir(structureDir, { recursive: true });
                    
                    // Write the structure file
                    await fs.writeFile(filePath, structure_file, 'utf8');
                    
                    res.status(200)
                    res.send({ 
                        status: { 
                            success: true, 
                            message: "Successfully created a course!",
                            structure_file: filename
                        }
                    })
                    
                } catch (fileError) {
                    console.log("Course created but failed to create structure file:", fileError);
                    res.status(200) // Still success for course creation
                    res.send({ 
                        status: { 
                            success: true, 
                            message: "Course created but structure file saving failed!",
                            warning: "Structure file could not be saved"
                        }
                    })
                }
                
            } else {
                res.status(500)
                res.send({ status: { success: false, message: "Error while creating a course! Try again!" } })
            }
        } else {
            console.log("Creating a course but missing a field!")
            res.status(400) // Changed from 204 to 400 for bad request
            res.send({ status: { success: false, message: "Missing one of the following fields: title, advisor_id, difficulty, description or structure_file!" } })
        }
    } catch (err) {
        console.log("Error at post /course/ route:")
        console.log(err)
        res.status(500).send({ status: { success: false, message: "Internal server error" } })
    }
})



module.exports = course;