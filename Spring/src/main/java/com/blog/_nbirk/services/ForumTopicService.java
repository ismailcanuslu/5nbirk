package com.blog._nbirk.services;

import com.blog._nbirk.entities.ForumTopic;
import com.blog._nbirk.exceptions.NotFoundException;
import com.blog._nbirk.repos.ForumTopicRepository;
import com.blog._nbirk.requests.ForumTopicUpdateRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ForumTopicService {
    private final ForumTopicRepository forumTopicRepository;
    ForumTopicService(ForumTopicRepository forumTopicRepository){
        this.forumTopicRepository = forumTopicRepository;
    }

    public List<ForumTopic> getAllTopics(){
        return forumTopicRepository.findAll();
    }

    public ForumTopic getTopicById(long id){
        return forumTopicRepository.findById(id).orElseThrow(()->new NotFoundException(id));
    }

    public ForumTopic createTopic(ForumTopic forumTopic){
        return forumTopicRepository.save(forumTopic);
    }

    @Transactional
    public ForumTopic updateTopic(long id, ForumTopicUpdateRequest forumTopicUpdateRequest){
        ForumTopic topic = getTopicById(id);

        forumTopicUpdateRequest.topicName().ifPresent(topic::setTopicName);
        forumTopicUpdateRequest.forumCategory().ifPresent(topic::setForumCategory);

        return forumTopicRepository.save(topic);
    }

    public void deleteTopic(long id){
        forumTopicRepository.deleteById(id);
    }
}
