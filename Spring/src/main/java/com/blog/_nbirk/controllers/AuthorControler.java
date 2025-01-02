package com.blog._nbirk.controllers;

import com.blog._nbirk.services.AuthorService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/authors")
public class AuthorControler {
    private final AuthorService authorService;
    AuthorControler(AuthorService authorService){
        this.authorService = authorService;
    }
}
