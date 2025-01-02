package com.blog._nbirk.repos;

import com.blog._nbirk.entities.ForumPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost,Long> {
}
