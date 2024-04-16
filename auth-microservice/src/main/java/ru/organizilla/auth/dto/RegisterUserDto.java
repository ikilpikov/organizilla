package ru.organizilla.auth.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {

    @Email
    @NotBlank
    @Size(min = 10, max = 100)
    private String email;

    @Size(min = 3, max = 40)
    @Pattern(regexp = "^[a-zA-Z0-9_]*$")
    private String username;

    @Size(min = 8, max = 50)
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$")
    private String password;

}
