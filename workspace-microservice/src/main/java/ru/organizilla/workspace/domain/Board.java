package ru.organizilla.workspace.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "board")
@Data
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private boolean closed;

    @Column(nullable = false)
    private boolean isPublic;

    @Column(nullable = false)
    private Timestamp lastActivity = new Timestamp(System.currentTimeMillis());

    @Column(nullable = true, length = 255)
    private String backgroundImage;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

}
