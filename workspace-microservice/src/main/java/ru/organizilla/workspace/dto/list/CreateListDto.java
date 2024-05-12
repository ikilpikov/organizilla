package ru.organizilla.workspace.dto.list;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateListDto {

    @NotBlank
    @Size(min = 1, max = 100)
    private String name;
    @NotNull
    private Long boardId;
}
