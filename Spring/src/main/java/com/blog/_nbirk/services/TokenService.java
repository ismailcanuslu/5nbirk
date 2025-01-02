package com.blog._nbirk.services;

import com.blog._nbirk.dto.AuthCredentials;
import com.blog._nbirk.entities.Token;
import com.blog._nbirk.entities.User;

public interface TokenService {
    Token createToken(User user, AuthCredentials credentials);
    User verifyToken(String authorizationHeader);
    void logout(String authorizationHeader);
}
