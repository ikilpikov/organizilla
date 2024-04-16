package ru.organizilla.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationEmailDto {

    @Email
    private String to;

    private String secretCode;

}
