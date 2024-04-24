package ru.organizilla.auth.util;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class SecretCodeUtil {

    Random random = new Random();

    public String generateSecretCode() {
        return Integer.toString(random.nextInt(9000) + 1000);
    }

}
