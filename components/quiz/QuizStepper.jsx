import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubjects } from '../../utils/QuizService'

const QuizStepper=()=>{

    const [currentStep,setCurrentStep]=useState(1)
    const [selectedSubject,setSelectedSubject]=useState("")
    const [selectedNumOfQuestions,setSelectedNumOfQuestions]=useState("")
    const [subjects,setSubjects]=useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        fetchSubjects()
    },[])

    const fetchSubjects=async()=>{
        try {
            const allSubjects=await getSubjects()
            setSubjects(allSubjects)
        } catch (error) {
            console.error(error)   
        }
    }
    const handleNext = ()=>{
        if(currentStep===3){
            if(selectedSubject&&selectedNumOfQuestions){
                navigate("/take-quiz",{state:{selectedNumOfQuestions,selectedSubject}})
            }else{
            alert("please select a subject and the number of questions")
            }
        }else{
            setCurrentStep((prevStep)=>prevStep+1)
        }
    }

    const handlePreviousStep = ()=>{
        setCurrentStep((prevStep)=>prevStep-1)
    }

    const handleSelectedSubject = (e)=>{
        setSelectedSubject(e.target.value)
    }
    const handleNumOfQuestionsChange=(e)=>{
        setSelectedNumOfQuestions(e.target.value)
    }

    const renderStepContent=()=>{
        switch(currentStep){
            case 1: return(
                <div>
                  <h3 className='text-info mb-2'>I want to take the quiz on :</h3>
                  <select className='form-select'
                  value={selectedSubject}
                  onChange={handleSelectedSubject}>

                    <option>Select a subject</option>
                    {subjects.map((subjects)=>(
                        <option key={subjects} value={subjects}>{subjects}</option>
                    ))}
                    </select>  
                </div>
            )
            case 2: return(
                <div>
                    <h4 className='text-info mb-2'>How many questions?</h4>
                    <input type='number'
                    className='form-control'
                    value={selectedNumOfQuestions}
                    onChange={handleNumOfQuestionsChange}
                    placeholder='Enter number of questions'/>
                </div>
            )
            case 3: return (
                <div>
                    <h2>Confirmation</h2>
                    <p>Subject:{selectedSubject}</p>
                    <p>Number of questions:{selectedNumOfQuestions}</p>
                </div>
            )
            default: return null



        }
    }

    const renderProgressBar=()=>{
        const progress=currentStep===3?100:((currentStep-1)/2)*100
        return (
            <div className='progress'>
                <div className='progress-bar'
                role='progressbar'
                style={{width:`${progress}%`}}
                aria-valuenow={progress}>
                    Step (currentStep)

                </div>
            </div>
        )
    }


    return (
        <div>

        </div>
    )
}

export default QuizStepper