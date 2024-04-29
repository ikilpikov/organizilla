package ru.organizilla.auth.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.organizilla.auth.domain.ConfirmationCode;
import ru.organizilla.auth.domain.User;
import ru.organizilla.auth.domain.enums.AccountStatus;
import ru.organizilla.auth.dto.*;
import ru.organizilla.auth.exception.AccountConfirmationException;
import ru.organizilla.auth.exception.AccountStatusException;
import ru.organizilla.auth.exception.UserNotFoundException;
import ru.organizilla.auth.repository.ConfirmationCodeRepository;
import ru.organizilla.auth.repository.UserRepository;
import ru.organizilla.auth.service.EmailService;
import ru.organizilla.auth.util.JwtUtil;
import ru.organizilla.auth.service.AuthService;
import ru.organizilla.auth.util.SecretCodeUtil;

import javax.management.openmbean.KeyAlreadyExistsException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final EmailService emailService;

    private final UserRepository userRepository;
    private final ConfirmationCodeRepository confirmationCodeRepository;

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;

    private final SecretCodeUtil secretCodeUtil;
    private final JwtUtil jwtUtil;

    private final int confirmationCodeLifetime = 3;

    @Override
    public TokenPairDto authenticateUsername(AuthUsernameDto authUsernameDto) {
        var user = userRepository
                .findByUsername(authUsernameDto.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found by username" +
                        authUsernameDto.getUsername()));

        if (user.getAccountStatus() != AccountStatus.ACTIVE) {
            throw new AccountStatusException("User is not active");
        }

        return authenticateUser(user.getUsername(), authUsernameDto.getPassword(), getSalt(user.getUsername()));
    }

    @Override
    public TokenPairDto authenticateEmail(AuthEmailDto authEmailDto) {
        var user = userRepository
                .findByEmail(authEmailDto.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found by email " +
                        authEmailDto.getEmail()));

        if (user.getAccountStatus() != AccountStatus.ACTIVE) {
            throw new AccountStatusException("User is not active");
        }

        return authenticateUser(user.getUsername(), authEmailDto.getPassword(), getSalt(user.getUsername()));
    }

    @Override
    public void registerUser(RegisterUserDto registerUserDTO) {
        if (userRepository.existsByEmail(registerUserDTO.getEmail())) {
            throw new KeyAlreadyExistsException("Email " + registerUserDTO.getEmail() + " already taken");
        }

        if (userRepository.existsByUsername(registerUserDTO.getUsername())) {
            throw new KeyAlreadyExistsException("Username " + registerUserDTO.getUsername() + " already taken");
        }

        User user = new User();
        user.setUsername(registerUserDTO.getUsername());
        user.setEmail(registerUserDTO.getEmail());

        String salt = BCrypt.gensalt();
        user.setSalt(salt);

        var encodedPassword = encoder.encode(registerUserDTO.getPassword() + salt);
        user.setPassword(encodedPassword);

        userRepository.save(user);
    }

    @Override
    @Transactional
    public TokenPairDto confirmRegistration(EmailConfirmationDto emailConfirmationDto) {
        var user = userRepository
                .findByEmail(emailConfirmationDto.getEmail())
                .orElseThrow(() -> new UserNotFoundException("User not found by email" +
                        emailConfirmationDto.getEmail()));

        if (user.getAccountStatus() != AccountStatus.EMAIL_UNVERIFIED) {
            throw new AccountConfirmationException("User already verified");
        }

        var actualSecretCode = Optional
                .ofNullable(user.getConfirmationCode())
                .orElseThrow(() -> new AccountConfirmationException("Secret code not found"));

        if (LocalDateTime.now().isAfter(user.getConfirmationCode().getCodeCreationDate().plusMinutes(3))) {
            throw new AccountConfirmationException("Code expired");
        }

        if (!actualSecretCode.getCode().equals(emailConfirmationDto.getSecretCode())) {
            throw new AccountConfirmationException("Wrong secret code");
        }

        user.setAccountStatus(AccountStatus.ACTIVE);
        userRepository.save(user);
        confirmationCodeRepository.deleteById(actualSecretCode.getId());

        var authority = AuthorityUtils.createAuthorityList(user.getRole().name()).get(0);
        return createTokenPair(user.getUsername(), authority);
    }

    @Override
    public void sendRegisterEmail(SendEmailDto sendEmailDto) {
        var user = userRepository.findByEmail(sendEmailDto.getEmail())
                .orElseThrow(() -> new BadCredentialsException("User not found by email" +
                        sendEmailDto.getEmail()));

        var secretCode = secretCodeUtil.generateSecretCode();

        var confirmationCodeEntity = user.getConfirmationCode() == null ? new ConfirmationCode() : user.getConfirmationCode();

        confirmationCodeEntity.setCode(secretCode);
        confirmationCodeEntity.setUser(user);
        confirmationCodeEntity.setCodeCreationDate(LocalDateTime.now());
        confirmationCodeRepository.save(confirmationCodeEntity);

        ActionEmailDto actionEmailDto = new ActionEmailDto();
        actionEmailDto.setTo(user.getEmail());
        actionEmailDto.setUsername(user.getUsername());
        actionEmailDto.setSecretCode(secretCode);

        emailService.sendRegisterEmail(actionEmailDto);
    }

    @Override
    public TokenPairDto refreshToken(String expiredRefreshToken) {
        var username = jwtUtil.getSubject(expiredRefreshToken);

        var user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));

        if (!user.getRefreshToken().equals(expiredRefreshToken)) {
            throw new BadCredentialsException("Invalid refresh token");
        }

        var authority = AuthorityUtils.createAuthorityList(user.getRole().name()).get(0);

        var tokenPair = createTokenPair(username, authority);
        saveRefreshToken(tokenPair.getRefreshToken(), username);

        return tokenPair;
    }

    private TokenPairDto authenticateUser(String username, String password, String salt) {
        UsernamePasswordAuthenticationToken authInputToken = new UsernamePasswordAuthenticationToken(
                username,
                password + salt
        );

        var authority = authenticationManager
                .authenticate(authInputToken)
                .getAuthorities()
                .stream()
                .findFirst()
                .orElseThrow(() -> new SecurityException("Role undefined"));

        var tokenPair = createTokenPair(username, authority);
        saveRefreshToken(tokenPair.getRefreshToken(), username);

        return tokenPair;
    }

    private TokenPairDto createTokenPair(String username, GrantedAuthority authority) {
        var accessToken = jwtUtil.createAccessToken(username, authority);
        var refreshToken = jwtUtil.createRefreshToken(username);

        var tokenPair = new TokenPairDto();
        tokenPair.setAccessToken(accessToken);
        tokenPair.setRefreshToken(refreshToken);
        return tokenPair;
    }

    private String getSalt(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new BadCredentialsException("User not found " + username))
                .getSalt();
    }

    private void saveRefreshToken(String refreshToken, String username) {
        var user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new BadCredentialsException("User not found " + username));

        user.setRefreshToken(refreshToken);
        userRepository.save(user);
    }

}
