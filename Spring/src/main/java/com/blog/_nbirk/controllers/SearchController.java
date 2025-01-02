package com.blog._nbirk.controllers;

import com.blog._nbirk.dto.BlogCategoryDTO;
import com.blog._nbirk.dto.UserDTO;
import com.blog._nbirk.requests.SearchQueryRequest;
import com.blog._nbirk.services.BlogCategoryService;
import com.blog._nbirk.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {
    private final BlogCategoryService blogCategoryService;
    private final UserService userService;

    SearchController(BlogCategoryService blogCategoryService,UserService userService){
        this.blogCategoryService = blogCategoryService;
        this.userService=userService;
    }

    @PostMapping("/categories")
    public ResponseEntity<List<BlogCategoryDTO>> searchCategories(@Valid @RequestBody SearchQueryRequest searchQueryRequest) {
        List<BlogCategoryDTO> categories = blogCategoryService.searchCategories(searchQueryRequest.query());
        return ResponseEntity.ok(categories);
    }
    @PostMapping("/users")
    public ResponseEntity<List<UserDTO>> searchUsers(@Valid @RequestBody SearchQueryRequest searchQueryRequest) {
        List<UserDTO> users = userService.searchUsers(searchQueryRequest.query());
        return ResponseEntity.ok(users);
    }
}
