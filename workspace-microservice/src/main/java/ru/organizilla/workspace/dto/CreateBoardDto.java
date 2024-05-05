package ru.organizilla.workspace.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateBoardDto {

    @NotBlank
    private String name;

    private String backgroundImage;

    @NotNull
    private boolean isPublic;

}
