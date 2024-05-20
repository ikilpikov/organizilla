package ru.organizilla.workspace.dao;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.organizilla.workspace.domain.User;
import ru.organizilla.workspace.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class UserDao {

    private final UserRepository userRepository;

    public User getUserByUsername(String username) {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
    }
}
