import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const QuizResult = () =>{
    const location =useLocation
    const {quizQuestions,totalScores}=location.state
    const numOfQuestions =quizQuestions.lenght
    const percentage = Math.round((totalScores/numOfQuestions)*100)
    const handleRetakeQuiz=()=>{
        alert("  ")
    }
    return (
        <section className='container mt-5'>
            <h3>Your quiz result:</h3>
            <hr/>
            <h5>You answered {totalScores} out of {numOfQuestions} questions correctly </h5>
            <p>Total score:{percentage}%.</p>
            <button className='btn btn-primary btn-sm' onClick={handleRetakeQuiz}>Retake quiz</button>
        </section>
    )
}

export default QuizResult