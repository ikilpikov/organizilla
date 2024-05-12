package ru.organizilla.auth.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendEmailDto {

    @Email
    private String email;
}
