package com.blog._nbirk.controllers;

import com.blog._nbirk.dto.BlogPostDTO;
import com.blog._nbirk.dto.UpdateBlogPostDTO;
import com.blog._nbirk.entities.BlogPost;
import com.blog._nbirk.services.BlogPostService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/blog")
public class BlogPostController {
    private final BlogPostService postService;
    BlogPostController(BlogPostService blogPostService){
        this.postService = blogPostService;
    }

    @PostMapping("/create-post")
    public ResponseEntity<BlogPost> createPost(@RequestBody @Valid BlogPostDTO postDTO) {
        BlogPost savedPost = postService.createPost(postDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPost);
    }
    @PutMapping("/post/{id}")
    public BlogPostDTO updatePostById(@PathVariable long id, @RequestBody UpdateBlogPostDTO updateBlogPostDTO) {
        return new BlogPostDTO(postService.updatePostById(id, updateBlogPostDTO));
    }

    //INFO AND SEARCH ALGORİTHMS
    @GetMapping("/latest-posts-home")
    public List<BlogPost> getLatestPostsForHome() {
        return postService.getLatestPostsForHome();
    }

    @GetMapping("/post-count")
    public long getTotalUserCount() {
        return postService.getTotalPostCount();
    }

    @GetMapping("/post-monthly-increase")
    public long getMonthlyUserIncrease() {
        return postService.getMonthlyPostIncrease();
    }

    @PostMapping("/post/search")
    public ResponseEntity<?> searchPosts(@RequestBody Map<String, String> request) {
        String searchValue = request.get("searchValue");

        if (searchValue != null && searchValue.startsWith("@")) {
            // @ ile başlıyorsa postId üzerinden arama yap
            try {
                Long postId = Long.parseLong(searchValue.substring(1)); // @ işaretinden sonrasını al
                BlogPost post = postService.findById(postId);
                return ResponseEntity.ok(post);
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body("Geçersiz postId formatı.");
            }
        } else if (searchValue != null && searchValue.length() > 4) {
            // 8 karakterden uzun bir text ise, text üzerinden arama yap
            List<BlogPost> posts = postService.searchByText(searchValue);
            return ResponseEntity.ok(posts);
        } else {
            return ResponseEntity.badRequest().body("Geçersiz arama kriteri.");
        }
    }

    @GetMapping("/{id}")
    BlogPostDTO getPostById(@PathVariable long id){

        return new BlogPostDTO(postService.getPostById(id));
    }

    @GetMapping("/latest-posts")
    public Page<BlogPost> getLatestPosts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int size
    ){
        return postService.getPaginetedPosts(page , size);
    }
}
