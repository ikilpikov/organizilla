package ru.organizilla.workspace.dto.card;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SetDescriptionDto {

    @Size(min = 1)
    private String description;
}
