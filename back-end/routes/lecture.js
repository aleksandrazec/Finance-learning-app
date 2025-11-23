
const express = require('express')
const lecture = express.Router()

const db = require('../DB/DbConn.js')


var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// get info about 1 lecture
lecture.get('/:id', async (req, res, next) => {
    try{

        const { id } = req.params;

        const queryResult = await db.getLecture(id);
        if(queryResult.length){
            res.status(200)
            res.json(queryResult[0])
        }else{
            res.sendStatus(404)
        }
        res.end()
    }catch(err){
        console.log('Error at /lecture/list route:')
        console.log(err)
        res.sendStatus(500)
    }
})

// create a lecture
lecture.post('/', urlencodedParser, async (req, res) =>{
    try{

        // todo - handling file upload

        const { title, text_file, course_id } = req.body

        if(title && text_file && course_id){

            const queryResult = await db.createLecture(title, text_file, course_id)
            if(queryResult.affectedRows){
                res.status(200)
                res.send({status : {success : true, message : "Successfully created a lecture!"}})
            }else{
                res.status(500)
                res.send({status : {success : false, message : "Error while creating a lecture! Try again!"}})
            }
        }else{
            res.status(204)
            res.send({status : {success : false, message : "Missing a field!"}})
        }



    }catch(err){
        console.log('Error at pos /lecture/ route:')
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = lecture;