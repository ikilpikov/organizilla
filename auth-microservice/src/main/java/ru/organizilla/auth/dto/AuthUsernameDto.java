package ru.organizilla.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthUsernameDto {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

}
