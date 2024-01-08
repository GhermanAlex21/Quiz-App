import React, { useEffect, useState } from "react"
import { deleteQuestion, getAllQuestions } from "../../utils/QuizService"

const GetAllQuiz = () =>{
const [questions, setQuestions]=useState([{Id: "",question:"",correctAnswers:"",choices:[]}])
const[isLoading,setIsLoading]= useState(true)
const[isQuestionDeleted,setIsQuestionDeleted]=useState(false)
const[deleteSuccesMessage,setDeleteSuccesMessage]=useState("")

useEffect(()=>{
    fetchAllQuestions()
},[])

const fetchAllQuestions=async()=>{

    try {
        const data = await getAllQuestions()
        setQuestions(data)
        isLoading(false)
        
    } catch (error) {
        console.error(error)
    }

}

const handleDelete=async(Id)=>{
    try {
        await deleteQuestion(Id)
        setQuestions(questions.filter((question)=>question.Id!==Id))
        setIsQuestionDeleted(true)
        setDeleteSuccesMessage("Question deleted successfully")

    } catch (error) {
        console.error(error)
        
    }
    setTimeout(()=>{
        setDeleteSuccesMessage("")
    },3000)
}

if (isLoading) {
    return <p>Loading...</p>
}

    return(
        <section className="container">
            <div className="row mt-5">
                <div className="col-md-6 mb-2 md-mb-0 " style={{color: "GrayText"}}>
                    <h4>All Quiz questions</h4>
                </div>
                <div className="col-md-4 d-flex justify-content-end">
                  
                </div>
            </div>
            <hr/>
            {isQuestionDeleted && <div className="alert alert-success">{deleteSuccesMessage}</div>}

            {questions.map((question,index)=>(
                <div>
                    <h4 style={{color: "GrayText"}}> 
                        (`${index +1}.${question.question}`)
                    </h4>
                    <ul>
                        {question.choices.map((choice,index)=>(
                            <li key={index}>{choice}</li>
                        ))}

                    </ul>
                      <p className="text-success">Correct Answer:{question.correctAnswers}</p>
                      <div className="btn-group mb-4">

                        <button className="btn btn-outline-danger btn-sm"
                        onClick={()=>(handleDelete(question.Id))}
                        
                        >
                            DeleteQuestion
                        </button>
                        </div>          


                </div>
            ))}
        </section>



    )



}

export default GetAllQuiz