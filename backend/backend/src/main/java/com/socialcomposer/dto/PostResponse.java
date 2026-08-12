package com.socialcomposer.dto;

import com.socialcomposer.model.Post;

import java.time.LocalDateTime;

public record PostResponse(Long id, String platform, String content, String scheduledTime, LocalDateTime createdAt) {

    public static PostResponse from(Post post) {
        return new PostResponse(post.getId(), post.getPlatform(), post.getContent(), post.getScheduledTime(), post.getCreatedAt());
    }
}
