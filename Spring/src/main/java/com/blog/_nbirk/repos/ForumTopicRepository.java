package com.blog._nbirk.repos;

import com.blog._nbirk.entities.ForumTopic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumTopicRepository extends JpaRepository<ForumTopic,Long> {
}
