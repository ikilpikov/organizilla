package ru.organizilla.controller;

import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.organizilla.service.impl.EmailServiceImpl;

@RestController("/send-mail")
@RequiredArgsConstructor
public class MailController {

    private final EmailServiceImpl emailService;

    @GetMapping(value = "/registration")
    public ResponseEntity<String> sendRegistrationEmail() {
        return new ResponseEntity<>("ok", HttpStatus.OK); //refactor
    }

}
