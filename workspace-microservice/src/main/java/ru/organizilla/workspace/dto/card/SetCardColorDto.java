package ru.organizilla.workspace.dto.card;

import lombok.Getter;
import lombok.Setter;
import ru.organizilla.workspace.domain.enums.Color;

@Getter
@Setter
public class SetCardColorDto {

    private Color color;
}
