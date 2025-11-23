
const express = require('express')
const game = express.Router()

const db = require('../DB/DbConn.js')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

game.get('/:id', async (req, res, next) => {
    try{
        const queryResult = await db.getGame(req.params.id)
        if(queryResult.length){
            res.json(queryResult[0])
        }else{
            res.sendStatus(404)
        }
    }catch(err){
        console.log("Error at /game/:id route")
        console.log(err)
        res.sendStatus(500)
    }
})

game.post('/', urlencodedParser, async (req, res) => {
    try{
        
        const { course_id, living_cost, start_money, start_date } = req.body;

        if(course_id && living_cost && start_money && start_date){

            const queryResult = await db.createGame(course_id, living_cost, start_money, start_date);
            if(queryResult.affectedRows){
                res.send({status : {success : true, message: "Successfully created a game!"}})
            }else{
                res.status(500)
                res.send({status : {success : false, message: "Error while creating a game! Try again!"}})
            }
        }else{
            console.log("Trying to create a game but missing a field")
            res.status(204)
            res.send({status : {success : false, message: "Missing a field!"}})
        }


    }catch(err){
        console.log("Error at post /game/ route")
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = game;