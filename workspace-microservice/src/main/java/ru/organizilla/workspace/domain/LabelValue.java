package ru.organizilla.workspace.domain;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "label_value")
@Data
public class LabelValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "label_color")
    private LabelColor labelColor;
    @ManyToOne
    @JoinColumn(name = "board")
    private Board board;
    @OneToMany(mappedBy = "labelValue", cascade = CascadeType.REMOVE)
    private Set<CardLabel> cardLabels = new HashSet<>();
    @Column(nullable = false, length = 100)
    private String value;
}