package com.blog._nbirk.requests;

import com.blog._nbirk.entities.ForumCategory;

import java.util.Optional;

public record ForumTopicUpdateRequest(
        Optional<String> topicName,
        Optional<ForumCategory> forumCategory) {
}
