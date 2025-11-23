
const express = require('express')
const forums = express.Router()

const DB = require('../DB/DbConn.js')


var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

forums.post('/find', urlencodedParser, async (req, res) => {
    var id = req.body.id;

    if (id) {
        try {
            let queryResult = await DB.findForum(id);
                console.log("Forum found")
                res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});


forums.post('/getcomments', urlencodedParser, async (req, res) => {
    var id = req.body.id;

    if (id) {
        try {
            let queryResult = await DB.getComments(id);
                console.log(queryResult)
                res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});


forums.post('/create', urlencodedParser, async (req, res) => {
    var prompt = req.body.prompt;
    var user_id = req.body.user_id;
    if (prompt && user_id) {
        try {
            let queryResult = await DB.createForum(prompt, user_id);
            if (queryResult.affectedRows) {
                console.log("Forum created")
                res.json({
                    "success": true,
                    "message": "Forum created"
                })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});

forums.post('/comment', urlencodedParser, async (req, res) => {
    var text = req.body.text;
    var user_id = req.body.user_id;
    var forum_id = req.body.forum_id;

    var isCompleteRequest = text && user_id && forum_id
    if (isCompleteRequest) {
        try {
            let queryResult = await DB.createComment(text, user_id, forum_id);
            if (queryResult.affectedRows) {
                console.log("Comment posted")
                res.json({
                    "success": true,
                    "message": "Comment posted"
                })
            }
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});

forums.post('/reply', urlencodedParser, async (req, res) => {
    var text = req.body.text;
    var user_id = req.body.user_id;
    var forum_id = req.body.forum_id;
    var reply_id = req.body.reply_id;

    var isCompleteRequest = text && user_id && forum_id && reply_id
    if (isCompleteRequest) {
        try {
            let queryResult = await DB.createReply(text, user_id, forum_id, reply_id);
                console.log("Comment posted")
                res.json(queryResult)
            
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});

forums.post('/getreplies', urlencodedParser, async (req, res) => {
    var id = req.body.id;

    if (id) {
        try {
            let queryResult = await DB.getReplies(id);
                console.log(queryResult)
                res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
    }
    else {
        console.log("Field is missing!")
        res.status(204)
    }
    res.end();
});

forums.post('/listall', urlencodedParser, async (req, res) => {
    var order = req.body.order
        try {
            let queryResult = await DB.listForumsDSC();
            console.log("Forums listed")
            res.json(queryResult)
        }
        catch (err) {
            console.log(err)
            res.status(500)
        }
})

module.exports = forums