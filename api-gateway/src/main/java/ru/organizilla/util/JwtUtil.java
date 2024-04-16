package ru.organizilla.util;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

@Component
public class JwtUtil {

    private final Key secretKey;

    public JwtUtil(@Value("${custom-properties.jwt.secret}") String secretKeyString) {
        this.secretKey = new SecretKeySpec(secretKeyString.getBytes(), "HmacSHA512");
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

}
