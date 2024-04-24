package ru.organizilla.auth.service;

import ru.organizilla.auth.dto.ActionEmailDto;
import ru.organizilla.auth.dto.SendEmailDto;

public interface EmailService {

    void sendRegisterEmail(ActionEmailDto actionEmailDto);
}
