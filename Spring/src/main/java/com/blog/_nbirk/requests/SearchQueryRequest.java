package com.blog._nbirk.requests;

import jakarta.validation.constraints.Size;

public record SearchQueryRequest(@Size(min =2,max = 64) String query) {
}
