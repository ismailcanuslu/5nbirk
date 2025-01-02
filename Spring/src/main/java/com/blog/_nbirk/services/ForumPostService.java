package com.blog._nbirk.services;

import com.blog._nbirk.entities.ForumPost;
import com.blog._nbirk.exceptions.NotFoundException;
import com.blog._nbirk.repos.ForumPostRepository;
import com.blog._nbirk.requests.ForumPostUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ForumPostService {
    private final ForumPostRepository forumPostRepository;
    ForumPostService(ForumPostRepository forumPostRepository){
        this.forumPostRepository = forumPostRepository;
    }
    public List<ForumPost> getAllPosts(){
        return forumPostRepository.findAll();
    }

    public ForumPost getPostById(long id){
        return forumPostRepository.findById(id).orElseThrow(()->new NotFoundException(id));
    }

    public ForumPost createPost(ForumPost forumPost){
        return forumPostRepository.save(forumPost);
    }

    @Transactional
    public ForumPost updatePost(long id, @Valid ForumPostUpdateRequest forumPostUpdateRequest){
        ForumPost post = getPostById(id);

        forumPostUpdateRequest.title().ifPresent(post::setTitle);
        forumPostUpdateRequest.text().ifPresent(post::setText);
        forumPostUpdateRequest.imagePath().ifPresent(post::setImagePath);
        forumPostUpdateRequest.forumTopic().ifPresent(post::setForumTopic);

        boolean isUpdated = forumPostUpdateRequest.title().isPresent()
                || forumPostUpdateRequest.text().isPresent()
                || forumPostUpdateRequest.imagePath().isPresent()
                || forumPostUpdateRequest.forumTopic().isPresent();

        if (isUpdated) {
            post.setUpdatedAt(LocalDateTime.now());
        }

        return forumPostRepository.save(post);
    }
}
