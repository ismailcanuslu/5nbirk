package com.blog._nbirk.requests;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record PasswordChangeRequest(
        @Id
        long id,
        @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$" ,message = "{5nbirk.constraint.password.pattern}")
        @Size(min = 8, max = 64, message = "{nbirk.constraint.password.size}")
        @NotBlank(message = "{nbirk.constraint.password.notblank}")
        String currentPassword,
        @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$" ,message = "{5nbirk.constraint.password.pattern}")
        @Size(min = 8, max = 64, message = "{nbirk.constraint.password.size}")
        @NotBlank(message = "{nbirk.constraint.password.notblank}")
        String newPassword
) {
}
