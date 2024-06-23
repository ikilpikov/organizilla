package ru.organizilla.workspace.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "card")
@Getter
@Setter
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "list")
    private ListEntity list;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private boolean closed = false;
    @Column(nullable = false)
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());
    @Column(nullable = false)
    private Timestamp lastActivity = new Timestamp(System.currentTimeMillis());
    @Column
    private Timestamp deadline;
    @Column
    private Integer position;
    @Column(nullable = false)
    private boolean isTemplate = false;
    @Column(columnDefinition = "TEXT")
    private String description;
    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;
    @OneToMany(mappedBy = "card", orphanRemoval = true)
    private List<CardLabel> labels;
}