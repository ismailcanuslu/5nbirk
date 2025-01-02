package com.blog._nbirk.dto;

import com.blog._nbirk.entities.BlogCategory;
import com.blog._nbirk.entities.BlogPost;

import java.util.Date;
import java.util.List;

public class BlogCategoryDTO {
    private long id;
    private String categoryName;
    private List<BlogPost> posts;
    private Date createdAt;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<BlogPost> getPosts() {
        return posts;
    }

    public void setPosts(List<BlogPost> posts) {
        this.posts = posts;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public BlogCategoryDTO(long id, String categoryName) {
        this.id = id;
        this.categoryName = categoryName;
    }

    public BlogCategoryDTO(){

    }

    public BlogCategoryDTO(BlogCategory blogCategory) {
        this.id = blogCategory.getId();
        this.categoryName = blogCategory.getCategoryName();
    }
}
