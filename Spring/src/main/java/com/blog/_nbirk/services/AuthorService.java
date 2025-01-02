package com.blog._nbirk.services;

import com.blog._nbirk.dto.AuthorDTO;
import com.blog._nbirk.entities.Authors;
import com.blog._nbirk.entities.User;
import com.blog._nbirk.exceptions.NotFoundException;
import com.blog._nbirk.repos.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AuthorService {
    private final AuthorRepository authorRepository;
    private final UserService userService;

    AuthorService(AuthorRepository authorRepository,UserService userService){
        this.authorRepository = authorRepository;
        this.userService = userService;
    }

    public Authors createAuthor(long userId, AuthorDTO authorDTO) {
        User user = userService.getUser(userId);
        if (user == null) {
            throw new NotFoundException(userId);
        }
        Authors author = new Authors();
        author.setUser(user);
        author.setName(authorDTO.getName());
        author.setLastname(authorDTO.getLastname());

        return authorRepository.save(author);
    }

    public List<Authors> getAuthorsByIds(List<Long> authorIds) {
        return authorRepository.findAllById(authorIds);
    }
}
