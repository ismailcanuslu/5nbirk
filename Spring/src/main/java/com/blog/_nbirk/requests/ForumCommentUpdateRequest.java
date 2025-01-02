package com.blog._nbirk.requests;

import jakarta.persistence.Lob;
import jakarta.validation.constraints.NotBlank;

public record ForumCommentUpdateRequest(@NotBlank
                                        @Lob
                                        String text) {

}
