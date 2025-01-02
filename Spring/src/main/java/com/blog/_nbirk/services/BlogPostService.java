package com.blog._nbirk.services;

import com.blog._nbirk.dto.BlogPostDTO;
import com.blog._nbirk.dto.UpdateBlogPostDTO;
import com.blog._nbirk.entities.Authors;
import com.blog._nbirk.entities.BlogCategory;
import com.blog._nbirk.entities.BlogPost;
import com.blog._nbirk.exceptions.ResourceNotFoundException;
import com.blog._nbirk.repos.BlogPostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BlogPostService {
    private final BlogPostRepository blogPostRepository;
    private final BlogCategoryService blogCategoryService;
    private final AuthorService authorService;
    BlogPostService(BlogPostRepository blogPostRepository, BlogCategoryService blogCategoryService, AuthorService authorService){
        this.blogPostRepository = blogPostRepository;
        this.blogCategoryService = blogCategoryService;
        this.authorService = authorService;

    }

    public BlogPost createPost(BlogPostDTO postDTO) {

        if (postDTO.getCategoryIds() == null || postDTO.getCategoryIds().isEmpty()) {
            throw new IllegalArgumentException("Category IDs cannot be null or empty");
        }

        if (postDTO.getAuthorIds() == null || postDTO.getAuthorIds().isEmpty()) {
            throw new IllegalArgumentException("Author IDs cannot be null or empty");
        }

        BlogPost createPost = new BlogPost();

        createPost.setTitle(postDTO.getTitle());
        createPost.setText(postDTO.getText());
        createPost.setImagePath(createPost.getImagePath());

        List<BlogCategory> postCategories = new ArrayList<>();
        postCategories = blogCategoryService.getBlogCategoriesByIds(postDTO.getCategoryIds());
        createPost.setCategories(postCategories);

        List<Authors> authorsList = new ArrayList<>();
        authorsList = authorService.getAuthorsByIds(postDTO.getAuthorIds());
        createPost.setAuthors(authorsList);

        createPost.populateNames();
        createPost.onCreate();

        return blogPostRepository.save(createPost);
    }

    public Page<BlogPost> getPaginetedPosts(int page, int size){
        Pageable pageable = PageRequest.of(page -1,size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<BlogPost> posts = blogPostRepository.findAll(pageable);
        posts.forEach(BlogPost::populateNames);
        return posts;
    }

    public List<BlogPost> getLatestPostsForHome() {
        List<BlogPost> posts = blogPostRepository.findTop4ByOrderByCreatedAtDesc();
        posts.forEach(BlogPost::populateNames);
        return posts;
    }

    public BlogPost updatePostById(long id, UpdateBlogPostDTO updateBlogPostDTO) {

        BlogPost updatePost = blogPostRepository.findById(id);
        if (updatePost == null) return null;

        updatePost.setText(updateBlogPostDTO.getText());
        updatePost.setTitle(updateBlogPostDTO.getTitle());
        updatePost.setImagePath(updateBlogPostDTO.getImagePath());

        List<BlogCategory> postCategories = new ArrayList<>();
        postCategories = blogCategoryService.getBlogCategoriesByIds(updateBlogPostDTO.getCategoryIds());
        updatePost.setCategories(postCategories);

        List<Authors> authorsList = new ArrayList<>();
        authorsList = authorService.getAuthorsByIds(updateBlogPostDTO.getAuthorIds());
        updatePost.setAuthors(authorsList);


        updatePost.onUpdate();

        return blogPostRepository.save(updatePost);
    }

    //INFO AND SEARCH ALGORITHMS

    public BlogPost findById(Long postId) {
        return blogPostRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException());
    }
    public List<BlogPost> searchByText(String text) {
        return blogPostRepository.findByTitleContainingOrTextContaining(text, text);
    }
    public BlogPost getPostById(long id){
        return blogPostRepository.findById(id);
    }
    public long getTotalPostCount() {
        return blogPostRepository.count();
    }
    public long getMonthlyPostIncrease() {
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        return blogPostRepository.countPostsCreatedAfter(thirtyDaysAgo);
    }
}
