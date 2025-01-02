package com.blog._nbirk.services;

import com.blog._nbirk.entities.ForumCategory;
import com.blog._nbirk.exceptions.NotFoundException;
import com.blog._nbirk.repos.ForumCategoryRepository;
import com.blog._nbirk.requests.ForumCategoryUpdateRequest;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ForumCategoryService {
    private final ForumCategoryRepository forumCategoryRepository;

    ForumCategoryService(ForumCategoryRepository forumCategoryRepository){
        this.forumCategoryRepository = forumCategoryRepository;
    }

    public List<ForumCategory> getAllCategories(){
        return forumCategoryRepository.findAll();
    }

    public ForumCategory getCategoryById(long id){
        return forumCategoryRepository.findById(id).orElseThrow(()->new NotFoundException(id));
    }

    @Transactional
    public ForumCategory updateCategory(long id, @Valid ForumCategoryUpdateRequest forumCategoryUpdateRequest){
        ForumCategory forumCategory = getCategoryById(id);

        forumCategory.setCategoryName(forumCategory.getCategoryName());

        return forumCategoryRepository.save(forumCategory);
    }

    public void deleteCategoryById(long id){
        forumCategoryRepository.deleteById(id);
    }

}
