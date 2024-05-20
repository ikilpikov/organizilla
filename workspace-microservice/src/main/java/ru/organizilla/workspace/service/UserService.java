package ru.organizilla.workspace.service;

import ru.organizilla.workspace.domain.User;

public interface UserService {

    User getUserByUsername(String username);
}
