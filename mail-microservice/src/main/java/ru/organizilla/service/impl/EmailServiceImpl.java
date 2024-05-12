package ru.organizilla.service.impl;

import jakarta.mail.internet.MimeMessage;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import ru.organizilla.enums.MailSubject;
import ru.organizilla.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender sender;
    private final String from;

    public EmailServiceImpl(JavaMailSender sender, @Value("${spring.mail.from}") String from) {
        this.sender = sender;
        this.from = from;
    }

    @Override
    public void sendRegistrationMail(String to, String username, String code) {
        sendHtmlEmail(to, MailSubject.REGISTRATION.toString(), username, code);
    }

    @SneakyThrows
    private void sendHtmlEmail(String recipientAddress, String subject, String username, String code) {
        MimeMessage message = sender.createMimeMessage();

        message.setSubject(subject);
        message.setFrom(from);
        MimeMessageHelper helper;
        helper = new MimeMessageHelper(message, true);
        helper.setTo(recipientAddress);

        helper.setText("<h1>wassup " + username +  " code " + code + "</h1>", true);
        sender.send(message);
    }
}
