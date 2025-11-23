
const express = require('express')
const stock = express.Router()

const db = require('../DB/DbConn.js')

stock.get('/:date', async (req, res, next) => {
    try{
        const queryResult = await db.getCompanyName(req.params.date)
        res.json(queryResult)
    }catch(err){
        console.log("Error at /stock/companyname route")
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = stock