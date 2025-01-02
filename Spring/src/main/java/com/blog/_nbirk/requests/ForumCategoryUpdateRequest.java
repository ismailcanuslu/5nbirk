package com.blog._nbirk.requests;

import jakarta.validation.constraints.NotBlank;

public record ForumCategoryUpdateRequest(@NotBlank String categoryName) {
}
