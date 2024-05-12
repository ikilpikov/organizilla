package ru.organizilla.auth.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "confirmation_code")
@Data
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
