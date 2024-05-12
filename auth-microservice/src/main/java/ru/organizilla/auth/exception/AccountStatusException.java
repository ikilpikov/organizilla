package ru.organizilla.auth.exception;

import org.springframework.security.core.AuthenticationException;

public class AccountStatusException extends AuthenticationException {

    public AccountStatusException(String msg) {
        super(msg);
    }
}
