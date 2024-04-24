package ru.organizilla.auth.domain;

import jakarta.persistence.*;
import lombok.*;
import ru.organizilla.auth.domain.enums.AccountStatus;
import ru.organizilla.auth.domain.enums.Role;

import java.util.List;

@Entity
@Table(name = "\"user\"")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", unique = true, nullable = false, length = 100)
    private String email;

    @Column(name = "username", unique = true, nullable = false, length = 50)
    private String username;

    @Column(name = "first_name", length = 50)
    private String firstName;

    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(name = "password", nullable = false, length = 60)
    private String password;

    @Column(name = "salt", nullable = false, length = 60)
    private String salt;

    @Column(name = "refresh_token", length = 300)
    private String refreshToken;

    @Column(name = "role", nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private Role role = Role.ROLE_USER;

    @Column(name = "account_status", nullable = false, length = 30)
    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus = AccountStatus.EMAIL_UNVERIFIED;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private ConfirmationCode confirmationCode;

}
