package com.blog._nbirk.repos;

import com.blog._nbirk.entities.ForumCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForumCategoryRepository extends JpaRepository<ForumCategory,Long> {
}
