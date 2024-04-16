package ru.organizilla.auth.service;

import ru.organizilla.auth.dto.*;

public interface AuthService {

    TokenPairDto authenticateUsername(AuthUsernameDto authUsernameDto);

    TokenPairDto authenticateEmail(AuthEmailDto authEmailDto);

    TokenPairDto registerUser(RegisterUserDto registerUserDTO);

    TokenPairDto refreshToken(String refreshToken);

}
