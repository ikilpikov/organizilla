package ru.organizilla.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenPairDto {

    private String accessToken;

    private String refreshToken;
}
