package com.blog._nbirk.controllers;

import com.blog._nbirk.dto.AuthCredentials;
import com.blog._nbirk.entities.User;
import com.blog._nbirk.requests.PasswordChangeRequest;
import com.blog._nbirk.responses.AuthResponse;
import com.blog._nbirk.services.AuthService;
import com.blog._nbirk.shared.GenericMessage;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping
    public ResponseEntity<AuthResponse> handleAuthentication(@Valid @RequestBody AuthCredentials credentials) {
        var authResponse = authService.authenticate(credentials);
        return ResponseEntity.ok().body(authResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<GenericMessage> handleLogout(@RequestHeader(name = "Authorization", required = false) String authorizationHeader) {
        authService.logout(authorizationHeader);
        return ResponseEntity.ok(new GenericMessage("Logout success"));
    }

    @PostMapping("/verify-token")
    public ResponseEntity<GenericMessage> handleVerifyToken(@RequestHeader(name = "Authorization", required = false) String authorizationHeader) {

        User user = authService.verifyToken(authorizationHeader);
        if (user != null) {
            return ResponseEntity.ok(new GenericMessage("Token is valid"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new GenericMessage("Invalid token"));
        }
    }
}
