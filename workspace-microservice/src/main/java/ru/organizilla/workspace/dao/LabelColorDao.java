package ru.organizilla.workspace.dao;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.organizilla.workspace.domain.LabelColor;
import ru.organizilla.workspace.domain.enums.Color;
import ru.organizilla.workspace.repository.LabelColorRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class LabelColorDao {
    private final LabelColorRepository labelColorRepository;

    public LabelColor getLabelColorByColor(Color color) {
        return labelColorRepository
                .findByColor(color)
                .orElseThrow(() -> new EntityNotFoundException("Label color not found: " + color));
    }

    public List<LabelColor> getLabelColors() {
        return labelColorRepository.findAll();
    }
}
