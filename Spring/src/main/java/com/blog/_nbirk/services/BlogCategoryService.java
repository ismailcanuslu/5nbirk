package com.blog._nbirk.services;

import com.blog._nbirk.dto.BlogCategoryDTO;
import com.blog._nbirk.entities.BlogCategory;
import com.blog._nbirk.repos.BlogCategoryRepository;
import com.blog._nbirk.requests.BlogCategoryCreateRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlogCategoryService {
    private final BlogCategoryRepository blogCategoryRepository;
    BlogCategoryService(BlogCategoryRepository blogCategoryRepository){
        this.blogCategoryRepository = blogCategoryRepository;
    }
    public BlogCategory createCategory(BlogCategoryCreateRequest categoryCreateRequest) {
        BlogCategory blogCategory = new BlogCategory();
        blogCategory.setCategoryName(categoryCreateRequest.categoryName());
        return blogCategoryRepository.save(blogCategory);
    }

    public BlogCategory updateCategoryById(long id, String categoryName) {

        BlogCategory updateCategory = blogCategoryRepository.findById(id).orElse(null);
        if (updateCategory == null) return null;
        updateCategory.setCategoryName(categoryName);

        Date currentDate = new Date();
        updateCategory.setUpdatedAt(currentDate);
        return blogCategoryRepository.save(updateCategory);
    }

    //INFO AND SEARCH ALGORITHMS
    public List<BlogCategoryDTO> searchCategories(String query) {

        return blogCategoryRepository.findByCategoryNameStartingWith(query)
                .stream()
                .map(category -> new BlogCategoryDTO(category.getId(), category.getCategoryName()))
                .collect(Collectors.toList());
    }

    public Page<BlogCategory> getPaginatedCategories(int page, int size) {

        if (page < 1) {
            throw new IllegalArgumentException("Page number must be 1 or greater");
        }

        if (size > 50) {
            size = 50;
        }

        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return blogCategoryRepository.findAll(pageable);
    }

    public List<BlogCategory> getAllBlogCategories() {
        return blogCategoryRepository.findAll();
    }

    public BlogCategory getBlogCategoryById(long id) {
        return blogCategoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("BlogCategory not found with id: " + id));
    }

    public List<BlogCategory> getBlogCategoriesByIds(List<Long> categoryIds) {
        return blogCategoryRepository.findAllById(categoryIds);
    }
}
