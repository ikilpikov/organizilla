package ru.organizilla.workspace.dto.card;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SetDescriptionDto {

    @Size(min = 1, max = 512)
    private String description;
}
