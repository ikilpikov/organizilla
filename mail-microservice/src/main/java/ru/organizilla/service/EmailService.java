package ru.organizilla.service;

public interface EmailService {

    void sendRegistrationMail(String to, String username, String code);
}
