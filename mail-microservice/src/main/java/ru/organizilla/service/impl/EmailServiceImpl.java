package ru.organizilla.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import ru.organizilla.enums.MailSubject;
import ru.organizilla.service.EmailService;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender sender;

    @Override
    public void sendRegistrationMail(String to, String code) {
        sendHtmlEmail(to, MailSubject.REGISTRATION.toString(), "<h1>hello</h1>");
    }

    @SneakyThrows
    private void sendHtmlEmail(String recipientAddress, String subject, String htmlContent) {
        MimeMessage message = sender.createMimeMessage();

        message.setSubject(subject);
        MimeMessageHelper helper;
        helper = new MimeMessageHelper(message, true);
        helper.setTo(recipientAddress);

        helper.setText(htmlContent, true);
        sender.send(message);
    }

}
