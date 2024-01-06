package com.example.quizonline.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter

@Entity

public class Question {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Long Id;
    @NotBlank
    private String question;
    @NotBlank
    private String subject;

    @NotBlank
    private String questionType;

    @NotBlank
    @ElementCollection
    private List<String> choices;

    @NotBlank
    @ElementCollection
    private List<String> correctAnswears;
}
