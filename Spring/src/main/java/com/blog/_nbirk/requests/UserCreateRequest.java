package com.blog._nbirk.requests;

import com.blog._nbirk.entities.User;
import com.blog._nbirk.validation.UniqueEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserCreateRequest(
        @NotBlank(message = "{nbirk.constraint.username.notblank}")
        @Size(min = 4, max = 64, message = "{nbirk.constraint.username.size}")
        String username,

        @NotBlank
        @Size(max = 64)
        @Email
        @UniqueEmail
        String email,

        @Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$" ,message = "{nbirk.constraint.password.pattern}")
        @Size(min = 8, max = 64, message = "{nbirk.constraint.password.size}")
        String password,

        @NotBlank(message = "{nbirk.constraint.name.notblank}")
        @Size(min = 2, max = 64, message = "{nbirk.constraint.name.size}")
        String name,

        @NotBlank(message = "{nbirk.constraint.lastname.notblank}")
        @Size(min = 2, max = 64, message = "{nbirk.constraint.lastname.size}")
        String lastname,

        @NotBlank
        @Size(max = 64)
        String language,
        @NotBlank
        @Size(max = 64)
        String country
) {
    public User toUser(){
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setName(name);
        user.setLastname(lastname);
        user.setLanguage(language);
        user.setCountry(country);
        return user;
    }
}
