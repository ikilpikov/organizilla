package ru.organizilla.auth.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

    private final String cookieName;

    private final Long refreshTokenCookieMaxAge;

    public CookieUtil(@Value("${authentication.jwt.refresh-token-lifetime-seconds}") Long refreshTokenCookieMaxAge,
                      @Value("${authentication.jwt.refresh-token-cookie-name}") String cookieName) {
        this.refreshTokenCookieMaxAge = refreshTokenCookieMaxAge;
        this.cookieName = cookieName;
    }

    public HttpCookie createRefreshTokenCookie(String token) {
        return ResponseCookie.from(cookieName, token)
                .maxAge(refreshTokenCookieMaxAge)
                .httpOnly(true)
                .path("/")
                .secure(true)
                .build();
    }

}