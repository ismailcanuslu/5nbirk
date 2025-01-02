package com.blog._nbirk.dto;

import com.blog._nbirk.entities.BlogPost;
import com.blog._nbirk.entities.BlogCategory;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.stream.Collectors;

public class BlogPostDTO {
    @Size(min = 4,max= 64)
    private String title;
    @Lob
    @Size(min = 8)
    private String text;
    @NotNull
    private List<Long> categoryIds;
    private List<String> categoryNames;
    @NotNull
    private List<Long> authorIds;
    private List<String> authorNames;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<Long> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(List<Long> categoryIds) {
        this.categoryIds = categoryIds;
    }

    public List<String> getCategoryNames() {
        return categoryNames;
    }

    public void setCategoryNames(List<String> categoryNames) {
        this.categoryNames = categoryNames;
    }

    public List<Long> getAuthorIds() {
        return authorIds;
    }

    public void setAuthorIds(List<Long> authorIds) {
        this.authorIds = authorIds;
    }

    public List<String> getAuthorNames() {
        return authorNames;
    }

    public void setAuthorNames(List<String> authorNames) {
        this.authorNames = authorNames;
    }


    public BlogPostDTO(BlogPost post) {
        setTitle(post.getTitle());
        setText(post.getText());
        setCategoryIds(post.getCategories().stream()
                .map(category -> category.getId())
                .collect(Collectors.toList()));

        setCategoryNames(post.getCategories().stream()
                .map(BlogCategory::getCategoryName)
                .collect(Collectors.toList()));

        setAuthorIds(post.getAuthors().stream()
                .map(author -> author.getId())
                .collect(Collectors.toList()));

        setAuthorNames(post.getAuthors().stream()
                .map(author -> author.getUser().getName() + " " + author.getUser().getName())
                .collect(Collectors.toList()));
    }
}
