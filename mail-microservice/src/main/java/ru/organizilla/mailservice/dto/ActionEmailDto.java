package ru.organizilla.mailservice.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActionEmailDto {

    @Email
    private String to;
    private String username;
    private String secretCode;
}
