package ru.organizilla.workspace.dto.card;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCardDto {

    @NotBlank
    @Size(min = 1, max = 100)
    private String name;
    @NotNull
    private Long listId;
}
