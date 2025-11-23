
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
    try {
        const { course_id, living_cost, start_money, start_date } = req.body;

        if (!course_id || !living_cost || !start_money || !start_date) {
            console.log("Trying to create a game but missing a field");
            return res.status(400).send({
                status: {
                    success: false,
                    message: "Missing one or more required fields!"
                }
            });
        }

        // Create the game first
        const queryResult = await db.createGame(course_id, living_cost, start_money, start_date);
        
        if (!queryResult.affectedRows) {
            return res.status(500).send({
                status: {
                    success: false,
                    message: "Error while creating a game! Try again!"
                }
            });
        }

        // Get the inserted game ID
        const gameId = queryResult[0].id;
        const new_line = `game, ${gameId}`;

        // Get course information for structure file
        const courseResult = await db.getCourse(course_id);
        if (!courseResult.length) {
            return res.status(404).send({
                status: {
                    success: false,
                    message: "Course not found!"
                }
            });
        }

        const structureFilename = courseResult[0].structure_file;
        if (!structureFilename) {
            return res.status(404).send({
                status: {
                    success: false,
                    message: "Structure file not found for this course!"
                }
            });
        }

        const filePath = path.join(__dirname, '../structure_files/', structureFilename);
        
        // Check if structure file exists
        try {
            await fs.access(filePath);
        } catch (error) {
            return res.status(404).send({
                status: {
                    success: false,
                    message: "Structure file does not exist on server!"
                }
            });
        }

        // Read and update structure file
        const currentContent = await fs.readFile(filePath, 'utf8');
        const updatedContent = currentContent + '\n' + new_line.trim();
        await fs.writeFile(filePath, updatedContent, 'utf8');
        
        // Send success response
        res.status(200).send({
            status: {
                success: true,
                message: "Successfully created a game and updated structure file!",
                structure_file: structureFilename,
                game_id: gameId
            }
        });

    } catch (err) {
        console.log("Error at post /game/ route:");
        console.log(err);
        res.status(500).send({
            status: {
                success: false,
                message: "Internal server error while creating game"
            }
        });
    }
});

module.exports = game;