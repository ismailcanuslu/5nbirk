package com.blog._nbirk.services;

import com.blog._nbirk.entities.PasswordResetToken;
import com.blog._nbirk.entities.User;
import com.blog._nbirk.exceptions.NotFoundException;
import com.blog._nbirk.mail.EmailService;
import com.blog._nbirk.repos.PasswordResetTokenRepository;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final UserService userService;
    private final EmailService emailService;

    PasswordResetService(PasswordResetTokenRepository passwordResetTokenRepository,UserService userService,EmailService emailService){
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.userService = userService;
        this.emailService = emailService;
    }
    @Transactional(rollbackOn = MailException.class)
    public boolean createPasswordResetToken(String email) {
        try {
            User user = userService.findByEmail(email);
            if (user == null) {
                throw new IllegalStateException("User not found");
            }
            String token = UUID.randomUUID().toString();

            PasswordResetToken resetToken = new PasswordResetToken();
            resetToken.setToken(token);
            resetToken.setUser(user);
            resetToken.setCreatedAt(LocalDateTime.now());
            resetToken.setExpiresAt(LocalDateTime.now().plusHours(2));

            passwordResetTokenRepository.saveAndFlush(resetToken);

            emailService.sendForgotPasswordEmail(user.getEmail(), token, user.getUsername());

            return true;
        } catch (DataIntegrityViolationException exception) {
            throw new RuntimeException("Data integrity violation occurred");
        } catch (MailException exception) {
            throw new RuntimeException("Error sending email");
        } catch (Exception e) {
            throw new RuntimeException("An unexpected error occurred");
        }
    }


    public boolean validatePasswordToken(String token){
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalStateException("Invalid token"));

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("Token has expired");
        }
        return true;
    }

    public PasswordResetToken findByToken(String token){
        return passwordResetTokenRepository.findByToken(token).orElseThrow(()->new NotFoundException(token));
    }
}
