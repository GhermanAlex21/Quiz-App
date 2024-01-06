package com.example.quizonline.service;

import com.example.quizonline.model.Question;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;
import java.util.Optional;

public interface IQuestionService {

    Question createQuestion(Question question);

    List<Question> getAllQuestions();

    Optional<Question> getQuestionById(Long Id);

    List<String> getAllSubjects();

    Question updateQuestion(Long Id,Question question) throws ChangeSetPersister.NotFoundException;

    void deleteQuestion(Long Id);

    List<Question> getQuestionsForUser(Integer numOfQuestions,String subjects);


}
