package com.blog._nbirk.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AuthCredentials(@Email @NotBlank @Size(max = 96) String email,
                              @NotBlank @Size(min = 8,max = 64) String password) {
}
