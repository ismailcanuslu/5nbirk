package com.blog._nbirk.errors;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.nio.file.AccessDeniedException;

public class GlobalErrorHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({DisabledException.class, AccessDeniedException.class})
    ResponseEntity<?> handleDisabledException(Exception exception, HttpServletRequest request){
        ApiError error = new ApiError();
        error.setMessage(exception.getMessage());
        error.setPath(request.getRequestURI());
        if (exception instanceof DisabledException) {
            error.setStatus(401);
        }else if(exception instanceof AccessDeniedException){
            error.setStatus(403);
        }

        return ResponseEntity.status(error.getStatus()).body(error);
    }
}
