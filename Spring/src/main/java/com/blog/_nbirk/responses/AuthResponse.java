package com.blog._nbirk.responses;

import com.blog._nbirk.dto.UserDTO;
import com.blog._nbirk.entities.Token;

public class AuthResponse {
    UserDTO user;

    Token token;

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public Token getToken() {
        return token;
    }

    public void setToken(Token token) {
        this.token = token;
    }
}
