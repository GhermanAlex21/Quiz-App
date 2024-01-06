package com.example.quizonline.service;

import com.example.quizonline.model.Question;
import com.example.quizonline.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService implements IQuestionService{
    private final QuestionRepository questionRepository;
    @Override
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Optional<Question> getQuestionById(Long Id) {
        return questionRepository.findById(Id);
    }

    @Override
    public List<String> getAllSubjects() {
        return questionRepository.findDistinctSubjects();
    }

    @Override
    public Question updateQuestion(Long Id, Question question) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestion=this.getQuestionById(Id);
        if(theQuestion.isPresent()){
            Question updatedQuestion = theQuestion.get();
            updatedQuestion.setQuestion(question.getQuestion());
            updatedQuestion.setChoices(question.getChoices());
            updatedQuestion.setCorrectAnswears(question.getCorrectAnswears());
            return questionRepository.save(updatedQuestion);
        }else {
            throw new ChangeSetPersister.NotFoundException();
        }

    }

    @Override
    public void deleteQuestion(Long Id) {
        questionRepository.deleteById(Id);

    }

    @Override
    public List<Question> getQuestionsForUser(Integer numOfQuestions, String subjects) {
        Pageable pageable= PageRequest.of(0,numOfQuestions);
        return questionRepository.findBySubjects(subjects,pageable).getContent();
    }
}
