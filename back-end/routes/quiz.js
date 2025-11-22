
const express = require('express')
const quiz = express.Router()

const db = require('../DB/DbConn.js')

quiz.get('/:id', async (req, res, next) => {
    try{
        const queryResult = await db.getQuiz(req.params.id);
        if(queryResult.length){
            res.json(queryResult[0])
        }else{
            res.sendStatus(404)
        }
        res.end()
    }catch(err){
        console.log("Error at /quiz/:id route")
        console.log(err)
        res.sendStatus(500)
    }
})

quiz.post('/', async (req, res, next) => {
    try{
        
    
        const { course_id, question, answer, wrong_op1, wrong_op2, wrong_op3 } = req.body;

        if(course_id && question && answer && wrong_op1 && wrong_op2 && wrong_op3){

            const queryResult = await db.createQuiz(course_id, question, answer, wrong_op1, wrong_op2, wrong_op3);
            if(queryResult.affectedRows){
                res.send({status : {success : true, message : "Successfully created a quiz!"}})
            }else{
                res.status(500)
                res.send({status : {success : false, message : "Error while creating a quiz! Try again!"}})
            }
        }else{
            console.log("Missing a field while creating a quiz!")
            res.status(204);
            res.send({status : {success : false, message : "Missing a field!"}})
        }
        
    
        res.end()
    }catch(err){
        console.log("Error at post /quiz/ route")
        console.log(err)
        res.sendStatus(500)
    }
})


module.exports = quiz