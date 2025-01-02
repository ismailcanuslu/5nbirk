package com.blog._nbirk.services;

import com.blog._nbirk.dto.AuthCredentials;
import com.blog._nbirk.dto.UserDTO;
import com.blog._nbirk.entities.Token;
import com.blog._nbirk.entities.User;
import com.blog._nbirk.exceptions.ActivationNotCompletedException;
import com.blog._nbirk.exceptions.AuthenticationException;
import com.blog._nbirk.exceptions.IncorrectPasswordException;
import com.blog._nbirk.exceptions.NotFoundException;
import com.blog._nbirk.repos.UserRepository;
import com.blog._nbirk.requests.PasswordChangeRequest;
import com.blog._nbirk.responses.AuthResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    AuthService(UserRepository userRepository,PasswordEncoder passwordEncoder,TokenService tokenService){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
    }
    public AuthResponse authenticate(AuthCredentials credentials) {
        User inDB = userRepository.findByEmail(credentials.email());
        if (inDB == null) throw new AuthenticationException();
        if (!passwordEncoder.matches(credentials.password(), inDB.getPassword())) throw new AuthenticationException();
        if (inDB.getActivationToken() != null) throw new ActivationNotCompletedException();

        Token token = tokenService.createToken(inDB, credentials);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(token);
        authResponse.setUser(new UserDTO(inDB));
        return authResponse;
    }

    public User changePassword(PasswordChangeRequest passwordChangeRequest) {
        User inDB = userRepository.findById(passwordChangeRequest.id())
                .orElseThrow(() -> new NotFoundException(passwordChangeRequest.id()));

        if (!passwordEncoder.matches(passwordChangeRequest.currentPassword(), inDB.getPassword())) {
            throw new IncorrectPasswordException();
        }

        inDB.setPassword(passwordEncoder.encode(passwordChangeRequest.newPassword()));
        return userRepository.save(inDB);
    }

    public void logout(String authorizationHeader) {
        tokenService.logout(authorizationHeader);
    }

    public User verifyToken(String authorizationHeader) {
        return tokenService.verifyToken(authorizationHeader);
    }

}
