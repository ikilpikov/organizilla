package ru.organizilla.mailservice.enums;

public enum MailSubject {

    REGISTRATION("Регистрация на Organizilla"),
    PASSWORD_CHANGE("Изменение пароля на Organizilla"),
    ;

    private final String subject;

    MailSubject(String subject) {
        this.subject = subject;
    }

    @Override
    public String toString() {
        return subject;
    }
}
