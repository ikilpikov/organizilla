package ru.organizilla.workspace.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "label_color")
@Data
public class LabelColor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String color;

}
