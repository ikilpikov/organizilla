package ru.organizilla.workspace.domain;


import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "label_value")
@Data
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