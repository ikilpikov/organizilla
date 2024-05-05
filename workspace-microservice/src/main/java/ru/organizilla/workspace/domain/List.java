package ru.organizilla.workspace.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "list")
@Data
public class List {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @ManyToOne
    @JoinColumn(name = "board")
    private Board board;

    @Column(nullable = false)
    private boolean closed;

    @Column(length = 6)
    private String color;

    @Column
    private Boolean subscribed;

}