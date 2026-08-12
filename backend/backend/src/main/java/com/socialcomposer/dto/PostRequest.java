package com.socialcomposer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PostRequest(
        @NotBlank(message = "Platform is required") String platform,
        @NotBlank(message = "Content cannot be empty")
        @Size(max = 3000, message = "Content cannot exceed 3000 characters") String content,
        String scheduledTime) {
}
