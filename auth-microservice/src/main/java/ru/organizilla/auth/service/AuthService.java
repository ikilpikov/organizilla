package ru.organizilla.auth.service;

import ru.organizilla.auth.dto.*;

public interface AuthService {

    TokenPairDto authenticateUsername(AuthUsernameDto authUsernameDto);
    TokenPairDto authenticateEmail(AuthEmailDto authEmailDto);

    void registerUser(RegisterUserDto registerUserDTO);
    void sendRegisterEmail(SendEmailDto sendEmailDto);
    TokenPairDto confirmRegistration(EmailConfirmationDto emailConfirmationDto);

    TokenPairDto refreshToken(String refreshToken);
}
