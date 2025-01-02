package com.blog._nbirk.controllers;

import com.blog._nbirk.dto.BlogCategoryDTO;
import com.blog._nbirk.entities.BlogCategory;
import com.blog._nbirk.requests.BlogCategoryCreateRequest;
import com.blog._nbirk.requests.BlogCategoryUpdateRequest;
import com.blog._nbirk.services.BlogCategoryService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/blog")
public class BlogCategoryController {
    private final BlogCategoryService categoryService;
    BlogCategoryController(BlogCategoryService blogCategoryService){
        this.categoryService = blogCategoryService;
    }
    @PostMapping("/category/create-category")
    public ResponseEntity<BlogCategory> createCategory(@RequestBody @Valid BlogCategoryCreateRequest categoryDTO) {
        BlogCategory newCategory = categoryService.createCategory(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
    }

    @GetMapping("/category/{id}")
    BlogCategoryDTO getCategoryById(@PathVariable long id){

        return new BlogCategoryDTO(categoryService.getBlogCategoryById(id));
    }

    @PutMapping("/category/{id}")
    public BlogCategoryDTO updateCategoryById(@PathVariable long id, @RequestBody @Valid BlogCategoryUpdateRequest blogCategoryUpdateRequest) {
        return new BlogCategoryDTO(categoryService.updateCategoryById(id, blogCategoryUpdateRequest.categoryName()));
    }

    @GetMapping("/all-categories")
    public Page<BlogCategory> getLatestPosts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size
    ){
        return categoryService.getPaginatedCategories(page , size);
    }

}
