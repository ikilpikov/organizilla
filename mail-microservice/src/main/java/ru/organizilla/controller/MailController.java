package ru.organizilla.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.organizilla.dto.ActionEmailDto;
import ru.organizilla.service.impl.EmailServiceImpl;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/v1/sendmail")
@RequiredArgsConstructor
public class MailController {

    private final EmailServiceImpl emailService;

    @PostMapping(value = "/register")
    public ResponseEntity<String> sendRegistrationEmail(@RequestBody ActionEmailDto emailDto) {
        emailService.sendRegistrationMail(emailDto.getTo(), emailDto.getUsername(), emailDto.getSecretCode());
        return ok().body("Email sent successfully");
    }

}
