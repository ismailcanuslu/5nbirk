package com.blog._nbirk.errors;

import com.blog._nbirk.exceptions.*;
import com.blog._nbirk.shared.Messages;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class ErrorHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiError> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception, HttpServletRequest request){
        ApiError apiError = new ApiError();
        apiError.setPath(request.getRequestURI());
        String validationError = Messages.getMessageForLocale("5nbirk.error.validation", LocaleContextHolder.getLocale());
        apiError.setMessage(validationError);
        apiError.setStatus(400);
        var validationErrors = exception.getBindingResult().getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        FieldError::getDefaultMessage,
                        (existing, replacing) -> existing
                ));
        apiError.setValidationErrors(validationErrors);
        return ResponseEntity.badRequest().body(apiError);
    }
    @ExceptionHandler(NotUniqueEmailException.class)
    ResponseEntity<ApiError> handleNotUniqueEmailException(NotUniqueEmailException exception){
        ApiError apiError = new ApiError();
        apiError.setPath("/api/v1/users");
        apiError.setMessage(exception.getMessage());
        apiError.setStatus(400);
        apiError.setValidationErrors(exception.getValidationErrors());
        return ResponseEntity.badRequest().body(apiError);
    }

    @ExceptionHandler(ActivationNotificationException.class)
    ResponseEntity<ApiError> handleActivationNotificationException(ActivationNotificationException exception){
        ApiError apiError = new ApiError();
        apiError.setPath("/api/v1/users");
        apiError.setMessage(exception.getMessage());
        apiError.setStatus(502);
        return ResponseEntity.status(502).body(apiError);
    }

    @ExceptionHandler(InvalidTokenException.class)
    ResponseEntity<ApiError> handleInvalidTokenException(InvalidTokenException exception){
        ApiError apiError = new ApiError();
        apiError.setPath("/api/v1/users");
        apiError.setMessage(exception.getMessage());
        apiError.setStatus(400);
        return ResponseEntity.status(400).body(apiError);
    }

    @ExceptionHandler(AuthenticationException.class)
    ResponseEntity<?> handleAuthenticationException(AuthenticationException exception){
        ApiError error = new ApiError();
        error.setPath("/api/v1/auth");
        error.setStatus(401);
        error.setMessage(exception.getMessage());
        return ResponseEntity.status(401).body(error);
    }

    @ExceptionHandler(ActivationNotCompletedException.class)
    ResponseEntity<ApiError> handleActivationNotCompletedException(ActivationNotCompletedException exception){
        ApiError apiError = new ApiError();
        apiError.setPath("/api/v1/auth");
        apiError.setMessage(exception.getMessage());
        apiError.setStatus(401);
        return ResponseEntity.status(401).body(apiError);
    }
    @ExceptionHandler(IncorrectPasswordException.class)
    ResponseEntity<ApiError> handleIncorrectPasswordException(IncorrectPasswordException exception) {
        ApiError apiError = new ApiError();
        apiError.setPath("/api/v1/auth/change-password");
        apiError.setMessage("Incorrect Password");
        apiError.setStatus(400);
        return ResponseEntity.status(400).body(apiError);
    }
}
