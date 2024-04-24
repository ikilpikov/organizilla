package ru.organizilla.auth.exception;

import org.springframework.security.core.AuthenticationException;

public class AccountConfirmationException extends AuthenticationException {

    public AccountConfirmationException(String msg) {
        super(msg);
    }

}
