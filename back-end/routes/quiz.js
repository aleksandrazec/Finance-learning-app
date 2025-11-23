
const express = require('express')
const quiz = express.Router()

const db = require('../DB/DbConn.js')


var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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

quiz.post('/', urlencodedParser, async (req, res) => {
    try {
        const { course_id, question, answer, wrong_op1, wrong_op2, wrong_op3 } = req.body;

        if (!course_id || !question || !answer || !wrong_op1 || !wrong_op2 || !wrong_op3) {
            console.log("Missing a field while creating a quiz!");
            return res.status(400).send({
                status: {
                    success: false,
                    message: "Missing one or more required fields!"
                }
            });
        }

        // Create the quiz first
        const queryResult = await db.createQuiz(course_id, question, answer, wrong_op1, wrong_op2, wrong_op3);
        
        if (!queryResult.affectedRows) {
            return res.status(500).send({
                status: {
                    success: false,
                    message: "Error while creating a quiz! Try again!"
                }
            });
        }

        // Get the inserted quiz ID
        const quizId =queryResult[0].id;
        const new_line = `quiz, ${quizId}`;

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
                message: "Successfully created a quiz and updated structure file!",
                structure_file: structureFilename,
                quiz_id: quizId
            }
        });

    } catch (err) {
        console.log("Error at post /quiz/ route:");
        console.log(err);
        res.status(500).send({
            status: {
                success: false,
                message: "Internal server error while creating quiz"
            }
        });
    }
});


module.exports = quiz