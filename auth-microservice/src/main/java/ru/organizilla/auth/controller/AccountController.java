package ru.organizilla.auth.controller;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.organizilla.auth.dto.GetUserInfoDto;
import ru.organizilla.auth.repository.UserRepository;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/v1/account")
@RequiredArgsConstructor
public class AccountController {

    private final UserRepository userRepository;
    public static final String USERNAME_HEADER = "X-Username";

    @GetMapping("/user")
    public ResponseEntity<GetUserInfoDto> getUserInfo(@RequestHeader(USERNAME_HEADER) String username) {
        var user = userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException(username));
        var userInfo = new GetUserInfoDto();
        userInfo.setEmail(user.getEmail());
        return ok(userInfo);
    }
}
