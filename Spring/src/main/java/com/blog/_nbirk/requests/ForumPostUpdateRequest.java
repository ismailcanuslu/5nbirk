package com.blog._nbirk.requests;

import com.blog._nbirk.entities.ForumTopic;

import java.util.Optional;

public record ForumPostUpdateRequest(
        Optional<String> title,
        Optional<String> text,
        Optional<String> imagePath,
        Optional<ForumTopic> forumTopic
) {
}
