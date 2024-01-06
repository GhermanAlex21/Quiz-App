package com.example.quizonline.controller;

import com.example.quizonline.model.Question;
import com.example.quizonline.service.IQuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuestionController {

    private final IQuestionService questionService;
    @PostMapping("/create-new-question")
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody Question question){
        Question createdQuestion=questionService.createQuestion(question);
        return ResponseEntity.status(CREATED).body(createdQuestion);

    }
    @GetMapping("/all-questions")
    public ResponseEntity<List<Question>> getAllQuestions(){

        List<Question> questions= questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }
    @GetMapping("/question/{Id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long Id) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestion=questionService.getQuestionById(Id);
        if(theQuestion.isPresent()){
            return ResponseEntity.ok(theQuestion.get());
        }else {
            throw new ChangeSetPersister.NotFoundException();
        }
    }
    @PutMapping("/{Id}/update")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long Id,@RequestBody Question question) throws ChangeSetPersister.NotFoundException {
        Question updatedQuestion=questionService.updateQuestion(Id,question);
        return ResponseEntity.ok(updatedQuestion);
    }
    @DeleteMapping("/{Id}/delete")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long Id){
        questionService.deleteQuestion(Id);
        return ResponseEntity.noContent().build();

    }
    @GetMapping("/subjects")
    public ResponseEntity<List<String>> getAllSubjects(){
        List<String> subjects=questionService.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }
@GetMapping("fetch-questions-for-user")
    public ResponseEntity<List<Question>> getQuestionsForUser(@RequestParam Integer numOfQuestions,@RequestParam String subject){

        List<Question> allQuestions= questionService.getQuestionsForUser(numOfQuestions,subject);
        List<Question> mutableQuestions = new ArrayList<>(allQuestions);
        Collections.shuffle(mutableQuestions);

        int availableQuestions = Math.min(numOfQuestions,mutableQuestions.size());
        List<Question> randomQuestion= mutableQuestions.subList(0,availableQuestions);
        return ResponseEntity.ok(randomQuestion);
    }
}
