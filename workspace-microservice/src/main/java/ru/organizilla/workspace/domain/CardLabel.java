package ru.organizilla.workspace.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "card_label")
@Getter
@Setter
public class CardLabel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "card")
    private Card card;
    @ManyToOne
    @JoinColumn(name = "label_value")
    private LabelValue labelValue;
}