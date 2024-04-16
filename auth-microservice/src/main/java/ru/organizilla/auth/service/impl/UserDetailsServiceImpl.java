package ru.organizilla.auth.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.organizilla.auth.repository.UserRepository;
import ru.organizilla.auth.security.UserDetailsImpl;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var person = userRepository.findByUsername(username);
        return person
                .map(UserDetailsImpl::new)
                .orElseThrow(() -> new UsernameNotFoundException("user " + username + " not found"));
    }

}
