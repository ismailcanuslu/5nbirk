package com.blog._nbirk.services;

import com.blog._nbirk.entities.ForumComment;
import com.blog._nbirk.exceptions.NotFoundException;
import com.blog._nbirk.repos.ForumCommentRepository;
import com.blog._nbirk.requests.ForumCommentUpdateRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ForumCommentService {
    private final ForumCommentRepository forumCommentRepository;
    ForumCommentService(ForumCommentRepository forumCommentRepository){
        this.forumCommentRepository = forumCommentRepository;
    }

    public List<ForumComment> getAllComments(){
        return forumCommentRepository.findAll();
    }

    public ForumComment getCommentById(long id){
        return forumCommentRepository.findById(id).orElseThrow(()-> new NotFoundException(id));
    }

    public ForumComment createComment(ForumComment forumComment){
        return forumCommentRepository.save(forumComment);
    }

    @Transactional
    public ForumComment updateComment(long id, ForumCommentUpdateRequest forumCommentUpdateRequest){
        ForumComment comment = getCommentById(id);

        if (forumCommentUpdateRequest.text() != null && !forumCommentUpdateRequest.text().isEmpty()){
            comment.setText(forumCommentUpdateRequest.text());
            comment.setUptadedAt(LocalDateTime.now());
        }

        return forumCommentRepository.save(comment);
    }

    public void deleteComment(long id){
        forumCommentRepository.deleteById(id);
    }

}
