package ru.organizilla.workspace.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "label_value")
@Getter
@Setter
public class LabelValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String value;
    @ManyToOne
    @JoinColumn(name = "label_color")
    private LabelColor labelColor;
    @ManyToOne
    @JoinColumn(name = "board")
    private Board board;
    @OneToMany(mappedBy = "labelValue", orphanRemoval = true)
    private List<CardLabel> cardLabels;
}