package ru.organizilla.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthEmailDto {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

}
