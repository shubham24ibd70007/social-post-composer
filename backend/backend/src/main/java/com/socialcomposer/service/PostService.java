package com.socialcomposer.service;

import com.socialcomposer.dto.PostRequest;
import com.socialcomposer.exception.ResourceNotFoundException;
import com.socialcomposer.model.Post;
import com.socialcomposer.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post createPost(PostRequest request) {
        Post post = new Post(request.platform(), request.content(), request.scheduledTime());
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post with id " + id + " was not found"));
    }

    public Post updatePost(Long id, PostRequest updatedPost) {

        Post post = getPostById(id);

        post.setPlatform(updatedPost.platform());
        post.setContent(updatedPost.content());
        post.setScheduledTime(updatedPost.scheduledTime());

        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        Post post = getPostById(id);
        postRepository.delete(post);
    }
}
