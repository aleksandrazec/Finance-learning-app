
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
lecture.post('/', urlencodedParser, async (req, res) => {
    try {
        const { title, text_file, course_id } = req.body;

        if (!title || !text_file || !course_id) {
            return res.status(400).send({
                status: {
                    success: false,
                    message: "Missing one or more required fields!"
                }
            });
        }

        // Create the lecture first
        const queryResult = await db.createLecture(title, text_file, course_id);
        
        if (!queryResult.affectedRows) {
            return res.status(500).send({
                status: {
                    success: false,
                    message: "Error while creating a lecture! Try again!"
                }
            });
        }

        // Get the inserted lecture ID
        const lectureId = queryResult[0].id;
        const new_line = `lecture, ${lectureId}`;

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
                message: "Successfully created a lecture and updated structure file!",
                structure_file: structureFilename,
                lecture_id: lectureId
            }
        });

    } catch (err) {
        console.log('Error at post /lecture/ route:');
        console.log(err);
        res.status(500).send({
            status: {
                success: false,
                message: "Internal server error while creating lecture"
            }
        });
    }
});
module.exports = lecture;