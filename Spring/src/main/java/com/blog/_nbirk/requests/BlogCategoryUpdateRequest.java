package com.blog._nbirk.requests;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record BlogCategoryUpdateRequest(
        @NotNull
                @Size(min =1, max = 64)
        String categoryName) {
}
