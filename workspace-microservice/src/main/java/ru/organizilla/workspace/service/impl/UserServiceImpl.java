package ru.organizilla.workspace.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.organizilla.workspace.domain.User;
import ru.organizilla.workspace.repository.UserRepository;
import ru.organizilla.workspace.service.UserService;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getUserByUsername(String username) {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + username));
    }
}
