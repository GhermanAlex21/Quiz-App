import React, { useEffect } from "react"
import { getQuestionById, updateQuestion } from "../../utils/QuizService"
import { useParams } from "react-router-dom"


const UpdateQuestion =()=>{

    const[question,setQuestion]= usestate("")
    const[choices,setChoices]=usestate([""])
    const[correctAnswers,setCorrectAnswers]=usestate([""])
    const[isLoading,setIsLoading]=useState(true)

    const{Id}=useParams()

    useEffect(()=>{
        fetchQuestion()
    }, [])
    

    const fetchQuestion = async()=>{
        try {
            const questionToUpdate = await getQuestionById(Id)
            if(questionToUpdate){
                setQuestion(questionToUpdate.question)
                setChoices(questionToUpdate.choices)
                setCorrectAnswers(questionToUpdate.correctAnswers)
                
            }
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }


    }

    const handleQuestionChange = (e)=>{
        setQuestion(e.target.value)
    }
    const handleChoiceChange = (index,e)=>{
        const updatedChoices = [...choices]
        updatedChoices[index]=e.target.value
        setChoices(updatedChoices)
    }

    const handleCorrectAnswerChange = (e)=>{
        setCorrectAnswers(e.target.value)
    }

    const handleQuestionUpdate =async(e)=>{
        e.preventDefault()
        try {
            const updatedQuestion = {question,choices,
                correctAnswers: correctAnswers.toString().split(",").map((answer)=>answer.trim())}
                await updateQuestion(Id,updatedQuestion)


        } catch (error) {
            console.error(error)
        }
    }

    if(isLoading){
        return <p>Loading...</p>
    }

    return(
        <section className="container">
            <h4 className="mt-5" style={{color: "GrayText"}}>Update Quizz Question</h4>
            <div className="col-md-8">
                <form onSubmit={handleQuestionUpdate}>
                    <div className="form-group">
                        <label className="text-info">Question:</label>
                        <textarea
                        className="form-control"
                        row={4}
                        value={question}
                        onChange={handleQuestionChange}/>
                    </div>
                    <div className="form-group">
                        <label className="text-info">Choices:</label>
                        {choices.map((choice,index)=>(
                            <input
                            key={index}
                            className="form-control"
                            type="text"
                            value={choice}
                            onChange={(e)=>handleChoiceChange(index,e)}/>
                        ))}
                    </div>

                    <div className="form-group">
                        <label className="text-info">Correct answer(s):</label>
                        <input
                            
                            className="form-control"
                            type="text"
                            value={correctAnswers}
                            onChange={handleCorrectAnswerChange}/>
                        /</div>
                            <div className="btn-group">
                                <button type="submit" className="btn-btn-sm btn-outline-warning">
                                    Update Question
                                </button>


                            </div>

                </form>


            </div>


        </section>

    )


}
export default updateQuestion