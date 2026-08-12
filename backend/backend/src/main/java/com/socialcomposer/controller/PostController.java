package com.socialcomposer.controller;

import com.socialcomposer.dto.ApiResponse;
import com.socialcomposer.dto.PostRequest;
import com.socialcomposer.dto.PostResponse;
import com.socialcomposer.service.PostService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PostResponse>> createPost(@Valid @RequestBody PostRequest post) {
        PostResponse response = PostResponse.from(postService.createPost(post));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Post created successfully", response));
    }

    @GetMapping
    public ApiResponse<List<PostResponse>> getAllPosts() {
        List<PostResponse> posts = postService.getAllPosts().stream().map(PostResponse::from).toList();
        return ApiResponse.success("Posts retrieved successfully", posts);
    }

    @GetMapping("/{id}")
    public ApiResponse<PostResponse> getPostById(@PathVariable Long id) {
        return ApiResponse.success("Post retrieved successfully", PostResponse.from(postService.getPostById(id)));
    }

    @PutMapping("/{id}")
    public ApiResponse<PostResponse> updatePost(
            @PathVariable Long id,
            @Valid @RequestBody PostRequest post) {

        return ApiResponse.success("Post updated successfully", PostResponse.from(postService.updatePost(id, post)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deletePost(@PathVariable Long id) {

        postService.deletePost(id);

        return ResponseEntity.ok(ApiResponse.success("Post deleted successfully", null));
    }
}
