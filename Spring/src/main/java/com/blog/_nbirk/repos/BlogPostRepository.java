package com.blog._nbirk.repos;

import com.blog._nbirk.entities.BlogPost;
import com.blog._nbirk.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost,Long> {
    BlogPost findById(long id);

    Page<BlogPost> findAll(Pageable pageable);

    List<BlogPost> findTop4ByOrderByCreatedAtDesc();

    @Query("SELECT COUNT(b) FROM BlogPost b WHERE b.createdAt >= :startDate")
    long countPostsCreatedAfter(LocalDateTime startDate);

    List<BlogPost> findByTitleContainingOrTextContaining(String title, String text);

    List<BlogPost> findByAuthorsContains(User author);
}
