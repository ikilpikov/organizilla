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
    @Pattern(regexp = "^\\w*$")
    private String username;
    @Size(min = 8, max = 50)
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$")
    private String password;
}
