package ru.organizilla.workspace.dto.board;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import ru.organizilla.workspace.domain.enums.Color;

@Getter
@Setter
public class SetColorValueDto {

    private Color color;
    @Size(min = 1, max = 100)
    private String value;
}
