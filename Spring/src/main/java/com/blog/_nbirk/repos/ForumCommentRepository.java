package com.blog._nbirk.repos;

import com.blog._nbirk.entities.ForumComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumCommentRepository extends JpaRepository<ForumComment,Long> {
}
