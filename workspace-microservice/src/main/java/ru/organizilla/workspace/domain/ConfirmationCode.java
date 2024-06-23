package ru.organizilla.workspace.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "confirmation_code")
@Getter
@Setter
public class ConfirmationCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "code", nullable = false, length = 4)
    private String code;
    @Column(name = "code_creation_date", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime codeCreationDate;
    @OneToOne
    @JoinColumn(name = "\"user\"", nullable = false)
    private User user;
}
