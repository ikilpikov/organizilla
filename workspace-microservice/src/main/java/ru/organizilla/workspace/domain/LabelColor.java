package ru.organizilla.workspace.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import ru.organizilla.workspace.domain.enums.Color;

@Entity
@Table(name = "label_color")
@Getter
@Setter
public class LabelColor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private Color color;
}
