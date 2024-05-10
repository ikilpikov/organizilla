package ru.organizilla.workspace.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "card")
@Data
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "list")
    private ListEntity listEntity;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false)
    private boolean closed;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column(nullable = false)
    private Timestamp lastActivity;

    @Column
    private Timestamp deadline;

    @Column(nullable = false)
    private boolean isTemplate;

    @Column(nullable = false)
    private boolean subscribed;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

}