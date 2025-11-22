
const express = require('express')

const user = express.Router()

const db = require('../DB/DbConn.js')

user.post('/login', async (req, res, next) => {
    try{

        const { username, password } = req.body;

        if(username && password){

            let queryResult = await db.validateUser(username, password);

            if(queryResult.length){
                // if non-empty result valid user-pass combination
                res.status(200)
                // send success message
                res.send({status : {success : true, message : 'Successfully logged in!'} })

                queryResult[0].password = "not so fast bruh";
                // set session variables
                req.session.user_info = queryResult[0]

            }else{
                // if empty result invalid user-pass combination
                res.status(204);
                res.send({status : {success : false, message : 'Invalid username, password combination!'} } )
            }

        }else{
            // missing username or password in body
            console.log("Trying to login, but missing username or password!")
            res.status(204)
            res.send({status :  {success : false, message : 'Missing username or password!'}})
        }

        res.end();
    }catch(err){
        console.log("Error on /user/login route")
        console.log(err)
        res.sendStatus(500)
    }
})

user.post('/logout', async (req, res, next) => {
    try{
        req.session.destroy(function(err){
            if(err){
                res.json({status : {success : false, message : err}})
            }
            res.json({status : {success : true} })
        })
    }catch(err){
        console.log('Error on /user/logout route')
        console.log(err)
        res.json({status : {success : false, msg : err}})
        res.sendStatus(500);
        next()
    }

})

user.post('/register', async (req, res, next) => {
    try{

        const { username, type, email, password } = req.body;
        
        if(username && type && email && password){
            const queryResult = await db.addUser(username, type, email, password);

            if(queryResult.affectedRows){
                console.log(`Successfuly added new user ${username}`)
                res.status(200)
                res.send({status :  {success : true, message : `Successfuly added new user ${username}`}})
            }else{
                console.log("Error while trying to add user to db!")
                res.status(500)
                res.send({status :  {success : false, message : 'Error while trying to add user to db! Try again, maybe with a different username!'}})
            }

        }else{
            // missing username or password in body
            console.log("Trying to register, but missing something!")
            res.status(204)
            res.send({status :  {success : false, message : 'Missing something of the following: username, type, email or password!'}})
        }

        res.end()
    }catch(err){
        console.log("Error on /user/register route")
        console.log(err)
        res.sendStatus(500)
    }
})

user.get('/session', (req, res, next) => {
    try{
        console.log("Session id:")
        console.log(req.sessionID)
        console.log("Session data:");
        console.log(req.session);
        res.json(req.session);
    } catch(err){
        console.log(err)
        res.status(500)
    }
})


module.exports = user