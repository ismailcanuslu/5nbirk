package com.blog._nbirk.controllers;

import com.blog._nbirk.entities.PasswordResetToken;
import com.blog._nbirk.repos.PasswordResetTokenRepository;
import com.blog._nbirk.services.PasswordResetService;
import com.blog._nbirk.services.UserService;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/password")
public class PasswordResetController {
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordResetService passwordResetService;
    private final UserService userService;
    PasswordResetController(PasswordResetTokenRepository passwordResetTokenRepository, PasswordResetService passwordResetService,UserService userService){
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.passwordResetService = passwordResetService;
        this.userService = userService;
    }

    @PostMapping("/request")
    public ResponseEntity<String> forgotPassword(@RequestParam("email") String email) {
        try {
            boolean isTokenCreated = passwordResetService.createPasswordResetToken(email);
            if (isTokenCreated) {
                return new ResponseEntity<>("Password reset token sent successfully.", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to create password reset token.", HttpStatus.BAD_REQUEST);
            }
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) throws MessagingException {
        PasswordResetToken passwordResetToken = passwordResetService.findByToken(token);

        if (passwordResetToken == null || passwordResetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }

        userService.resetPassword(token,newPassword);

        passwordResetTokenRepository.delete(passwordResetToken);

        return ResponseEntity.ok("Password changes successfully");
    }
}
