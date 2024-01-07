import axios from "axios"

export const api = axios.create({baseURL: "http://localhost:9192/api/quizzes"})

export const createQuestion= async(quizQuestion) =>{

    try {
        const response = await api.post("/create-new-question",quizQuestion)
        return response.data
        
    } catch (error) {
        console.error(error)
        
    }

}

export const getAllQuestions = async() =>{
try {
    const response = await api.get("/all-questions")
    return response.data
    
    } catch (error) {
        console.error(error)
        return []
    
    }

}

export const fetchQuizForUser = async(number,subject)=>{
try {
    const response = await api.get(`/quiz/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`);

    return response.data
    
} catch (error) {
    console.error(error)
    return []
}

}

export const getSubjects = async()=>{
    try {
        const response = await api.get("/subjects")
        return response.data
        
    } catch (error) {
        console.error(error)
    }
}

export const updateQuestion =async(Id, question)=>{
    try {
        const response = await api.put(`/question/${Id}/update`, question)
        return response.data
        
    } catch (error) {
        console.error(error)
        
    }
}

export const getQuestionById = async(Id)=>{

    try {
        const response = await api.get(`/question/${Id}`)
        return response.data
    } catch (error) {
        console.error(error)
        
    }
    
}

export const deleteQuestion = async(Id)=>{
    try {
        const response = await api.delete(`/question/${Id}/delete`)
        return response.data
        
    } catch (error) {
        console.error(error)
        
    }
}
