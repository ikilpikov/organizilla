package ru.organizilla.auth.util;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

    private final SecretKey secretKey;

    private final String issuer;

    private final Long accessTokenLifeTimeSeconds;

    private final Long refreshTokenLifeTimeSeconds;

    public JwtUtil(@Value("${authentication.jwt.secret}") String secretKeyString,
                   @Value("${authentication.jwt.issuer}") String issuer,
                   @Value("${authentication.jwt.access-token-lifetime-seconds}") Long accessTokenLifeTimeSeconds,
                   @Value("${authentication.jwt.refresh-token-lifetime-seconds}") Long refreshTokenLifeTimeSeconds) {
        this.secretKey = new SecretKeySpec(secretKeyString.getBytes(), "HmacSHA512");
        this.issuer = issuer;
        this.accessTokenLifeTimeSeconds = accessTokenLifeTimeSeconds;
        this.refreshTokenLifeTimeSeconds = refreshTokenLifeTimeSeconds;
    }

    public String createAccessToken(String username, GrantedAuthority a) {
        var tokenExpirationDate = Date.from(ZonedDateTime.now().plusSeconds(accessTokenLifeTimeSeconds).toInstant());

        return Jwts.builder()
                .claims(Map.of("role", a.getAuthority()))
                .subject(username)
                .issuer(issuer)
                .signWith(secretKey)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(tokenExpirationDate)
                .compact();
    }

    public String createRefreshToken(String username) {
        var tokenExpirationDate = Date.from(ZonedDateTime.now().plusSeconds(refreshTokenLifeTimeSeconds).toInstant());

        return Jwts.builder()
                .subject(username)
                .issuer(issuer)
                .signWith(secretKey)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(tokenExpirationDate)
                .compact();
    }

    public String getSubject(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

}
