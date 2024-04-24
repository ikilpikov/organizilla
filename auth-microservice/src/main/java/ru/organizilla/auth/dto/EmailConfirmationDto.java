package ru.organizilla.auth.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailConfirmationDto {

    @Email
    private String email;

    private String secretCode;

}
