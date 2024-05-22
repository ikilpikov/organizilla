package ru.organizilla.workspace.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.organizilla.workspace.domain.LabelColor;
import ru.organizilla.workspace.domain.enums.Color;

import java.util.Optional;

public interface LabelColorRepository extends JpaRepository<LabelColor, Long> {

    Optional<LabelColor> findByColor(Color color);
}
