package ru.organizilla.auth.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.organizilla.auth.domain.User;
import ru.organizilla.auth.domain.enums.Role;
import ru.organizilla.auth.dto.AuthEmailDto;
import ru.organizilla.auth.dto.AuthUsernameDto;
import ru.organizilla.auth.dto.RegisterUserDto;
import ru.organizilla.auth.dto.TokenPairDto;
import ru.organizilla.auth.repository.UserRepository;
import ru.organizilla.auth.util.JwtUtil;
import ru.organizilla.auth.service.AuthService;

import javax.management.openmbean.KeyAlreadyExistsException;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder encoder;

    @Override
    public TokenPairDto authenticateUsername(AuthUsernameDto authUsernameDto) {
        return authenticateUser(authUsernameDto.getUsername(),
                authUsernameDto.getPassword(),
                getSalt(authUsernameDto.getUsername()));
    }

    @Override
    public TokenPairDto authenticateEmail(AuthEmailDto authEmailDto) {
        var username = userRepository
                .findByEmail(authEmailDto.getEmail())
                .orElseThrow(() -> new BadCredentialsException("User not found by email" +
                        authEmailDto.getEmail()))
                .getUsername();

        return authenticateUser(username, authEmailDto.getPassword(), getSalt(username));
    }

    @Override
    public TokenPairDto registerUser(RegisterUserDto registerUserDTO) {
        if (userRepository.existsByEmail(registerUserDTO.getEmail())) {
            throw new KeyAlreadyExistsException("Email " + registerUserDTO.getEmail() + " already taken");
        }

        if (userRepository.existsByUsername(registerUserDTO.getUsername())) {
            throw new KeyAlreadyExistsException("Username " + registerUserDTO.getUsername() + " already taken");
        }

        User user = new User();
        user.setUsername(registerUserDTO.getUsername());
        user.setRole(Role.ROLE_USER);
        user.setEmail(registerUserDTO.getEmail());

        String salt = BCrypt.gensalt();
        user.setSalt(salt);

        var encodedPassword = encoder.encode(registerUserDTO.getPassword() + salt);
        user.setPassword(encodedPassword);

        userRepository.save(user);

        var username = user.getUsername();
        var authority = AuthorityUtils.createAuthorityList(user.getRole().name()).get(0);
        return createTokenPair(username, authority);
    }

    @Override
    public TokenPairDto refreshToken(String expiredRefreshToken) {
        var username = jwtUtil.getSubject(expiredRefreshToken);

        var user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new BadCredentialsException(username));

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
