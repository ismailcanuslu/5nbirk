package com.blog._nbirk.repos;

import com.blog._nbirk.entities.BlogCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Long> {
    List<BlogCategory> findByCategoryNameStartingWith(String categoryName);

    Page<BlogCategory> findAll(Pageable pageable);
}
