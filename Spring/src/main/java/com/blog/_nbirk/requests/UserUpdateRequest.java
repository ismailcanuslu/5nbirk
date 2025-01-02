package com.blog._nbirk.requests;

import jakarta.validation.constraints.Size;

import java.util.Optional;

public record UserUpdateRequest(

        @Size(min = 4, max = 64)
        Optional<String> username,

        @Size(min = 2, max = 64, message = "{nbirk.constraint.name.size}")
        Optional<String> name,

        @Size(min = 2, max = 64, message = "{nbirk.constraint.lastname.size}")
        Optional<String> lastname,

        @Size(max = 64)
        Optional<String> language,

        @Size(max = 64)
        Optional<String> country
) {
}
