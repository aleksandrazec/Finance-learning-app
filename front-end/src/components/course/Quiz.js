import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import api from '../../services/api';

function Quiz(props) {
    const { id } = useParams();
    const [quizzes, setQuizzes] = useState([])
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)

    useEffect(() => {
        const getQuizzes = () => {
            try {
                // If id is course_id, get all quizzes for the course
                api.get(`/quiz/course/${id}`)
                    .then(result => {
                        console.log('Quizzes:', result.data)
                        setQuizzes(result.data)
                    })
                    .catch(err => console.error(err))
            } catch (error) {
                console.error(error)
            }
        }
        getQuizzes()
    }, [id])

    const currentQuiz = quizzes[currentQuizIndex]

    const handleAnswerSelect = (answer) => {
        if (!showResult) {
            setSelectedAnswer(answer)
        }
    }

    const handleSubmit = () => {
        if (!selectedAnswer) return;
        
        setShowResult(true)
        if (selectedAnswer === currentQuiz.answer) {
            setScore(score + 1)
        }
    }

    const handleNext = () => {
        setSelectedAnswer('')
        setShowResult(false)
        if (currentQuizIndex < quizzes.length - 1) {
            setCurrentQuizIndex(currentQuizIndex + 1)
        } else {
            // Quiz completed
            alert(`Quiz completed! Your score: ${score}/${quizzes.length}`)
        }
    }

    const getOptionStyle = (option) => {
        if (!showResult) {
            return selectedAnswer === option ? 'selected' : ''
        }
        
        if (option === currentQuiz.answer) {
            return 'correct'
        } else if (option === selectedAnswer && option !== currentQuiz.answer) {
            return 'incorrect'
        }
        return ''
    }

    if (quizzes.length === 0) {
        return <div>Loading quizzes...</div>
    }

    if (!currentQuiz) {
        return <div>No quizzes available</div>
    }

    return (
        <div className="quiz-page">
            <div className="quiz-header">
                <h1>Quiz</h1>
                <div className="quiz-progress">
                    Question {currentQuizIndex + 1} of {quizzes.length}
                </div>
                <div className="quiz-score">
                    Score: {score}/{quizzes.length}
                </div>
            </div>

            <div className="quiz-content">
                <h2 className="quiz-question">{currentQuiz.question}</h2>
                
                <div className="quiz-options">
                    {[currentQuiz.op1, currentQuiz.op2, currentQuiz.op3, currentQuiz.answer]
                        .filter(option => option) // Remove empty options
                        .sort(() => Math.random() - 0.5) // Shuffle options
                        .map((option, index) => (
                            <button
                                key={index}
                                className={`quiz-option ${getOptionStyle(option)}`}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={showResult}
                            >
                                {option}
                            </button>
                        ))
                    }
                </div>

                {!showResult ? (
                    <button 
                        className="submit-btn"
                        onClick={handleSubmit}
                        disabled={!selectedAnswer}
                    >
                        Submit Answer
                    </button>
                ) : (
                    <div className="quiz-result">
                        <p className={selectedAnswer === currentQuiz.answer ? 'correct-feedback' : 'incorrect-feedback'}>
                            {selectedAnswer === currentQuiz.answer 
                                ? 'Correct! 🎉' 
                                : `Incorrect! The correct answer is: ${currentQuiz.answer}`
                            }
                        </p>
                        <button className="next-btn" onClick={handleNext}>
                            {currentQuizIndex < quizzes.length - 1 ? 'Next Question' : 'Finish Quiz'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Quiz