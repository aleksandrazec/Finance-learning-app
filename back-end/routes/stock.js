
const express = require('express')
const stock = express.Router()

const db = require('../DB/DbConn.js')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })


stock.post('/', urlencodedParser, async (req, res) => {
    try {

        const date=req.body.date
        const close=req.body.close
        const volume=req.body.volume
        const company=req.body.company

        const queryResult = await db.addStock(date, close, volume, company)
        if (queryResult.affectedRows) {
            res.json({ status: { success: true, message: "Successfully added a stock!" } })
        } else {
            res.json({ status: { success: false, message: "Error while adding a stock!" } })
        }
    } catch (err) {
        console.log("Error in post /stock/ route")

    }
})



stock.post('/batch', urlencodedParser, async (req, res) => {
    try {
        // receiving text

        console.log(req.body)
        const text  = req.body.text

        const queryResult = await db.addStocksBatch(text)
        if (queryResult.affectedRows) {
            res.json({ status: { success: true, message: "Successfully added a batch of stocks!" } })
        } else {
            res.json({ status: { success: false, message: "Error while adding a batch of stocks!" } })
        }
    } catch (err) {
        console.log("Error in post /stock/batch route")

    }
})


stock.get('/:date', async (req, res, next) => {
    try {
        const queryResult = await db.getCompanyName(req.params.date)
        res.json(queryResult)
    } catch (err) {
        console.log("Error at /stock/companyname route")
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports = stock