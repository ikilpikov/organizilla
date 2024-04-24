package ru.organizilla.auth.service;

import ru.organizilla.auth.dto.*;

public interface AuthService {

    TokenPairDto authenticateUsername(AuthUsernameDto authUsernameDto);

    TokenPairDto authenticateEmail(AuthEmailDto authEmailDto);

    void registerUser(RegisterUserDto registerUserDTO);

    void sendRegisterEmail(SendEmailDto sendEmailDto);

    TokenPairDto refreshToken(String refreshToken);

    TokenPairDto confirmRegistration(EmailConfirmationDto emailConfirmationDto);

}
