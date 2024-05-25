package ru.organizilla.workspace.dto.card;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SetDescriptionDto {

    @NotNull
    @Size(min = 1, max = 512)
    private String description;
}
