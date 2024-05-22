package ru.organizilla.workspace.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

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
    @Column
    private String backgroundImage;
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<BoardColab> boardColab;
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<ListEntity> lists;
    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<LabelValue> labels;
}
