
const express = require('express')
const stock = express.Router()

const db = require('../DB/DbConn.js')

stock.post('/batch', async (req, res, next) => {
    try{
        // receiving text
        const { text } = req.body

        const queryResult = await db.addStocksBatch(text)
        if(queryResult.affectedRows){
            res.json({status : {success : true, message : "Successfully added a batch of stocks!"}})
        }else{
            res.json({status : {success : false , message : "Error while adding a batch of stocks!"}})
        }
    }catch(err){
        console.log("Error in post /stock/batch route")
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = stock