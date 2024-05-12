package ru.organizilla.auth.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ru.organizilla.auth.dto.ActionEmailDto;
import ru.organizilla.auth.service.EmailService;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final RestTemplate restTemplate;

    private final String sendEmailEndpoint = "http://localhost:8083/api/v1/sendmail/register";

    @Override
    public void sendRegisterEmail(ActionEmailDto actionEmailDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<ActionEmailDto> request = new HttpEntity<>(actionEmailDto, headers);
        restTemplate.postForEntity(sendEmailEndpoint, request, Void.class);
    }
}
