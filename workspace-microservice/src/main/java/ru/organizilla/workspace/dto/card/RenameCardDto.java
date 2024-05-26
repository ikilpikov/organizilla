package ru.organizilla.workspace.dto.card;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RenameCardDto {

    @NotNull
    @Size(min = 1, max = 50)
    private String name;
}
