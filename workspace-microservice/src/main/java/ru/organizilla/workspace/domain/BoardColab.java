package ru.organizilla.workspace.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "board_colab")
@Data
public class BoardColab {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "\"user\"")
    private User user;

    @ManyToOne
    @JoinColumn(name = "board")
    private Board board;

    @Column(nullable = false, length = 50)
    private String authority;

}