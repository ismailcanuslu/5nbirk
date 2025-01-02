package com.blog._nbirk.services;

import com.blog._nbirk.dto.AuthCredentials;
import com.blog._nbirk.entities.Token;
import com.blog._nbirk.entities.Role;
import com.blog._nbirk.entities.User;
import com.blog._nbirk.exceptions.NotFoundException;
import com.blog._nbirk.repos.TokenRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Primary
public class JwtTokenService implements TokenService {

    private final TokenRepository tokenRepository;
    private final SecretKey key;
    private final ObjectMapper mapper;


    JwtTokenService(@Value("${jwt.secret}") String secret, TokenRepository tokenRepository) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.tokenRepository = tokenRepository;
        this.mapper = new ObjectMapper();
    }


    @Override
    public Token createToken(User user, AuthCredentials credentials) {
        List<String> rolesAsString = user.getRoles().stream()
                .map(role -> role.getRole().name())
                .collect(Collectors.toList());

        TokenSubject tokenSubject = new TokenSubject(user.getId(), user.isActive(), rolesAsString);
        try {
            String subject = mapper.writeValueAsString(tokenSubject);
            String tokenValue = Jwts.builder()
                    .setSubject(subject)
                    .signWith(key, SignatureAlgorithm.HS384)
                    .compact();

            Token token = new Token("Bearer", tokenValue, user);
            tokenRepository.save(token);

            return token;

        } catch (JsonProcessingException e) {
            throw new RuntimeException("Token create error:", e);
        }
    }

    @Override
    public User verifyToken(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return null;
        }

        String tokenValue = authorizationHeader.split(" ")[1];

        try {

            Token token = tokenRepository.findByToken(tokenValue)
                    .filter(t -> t.getExpiresAt().isAfter(LocalDateTime.now()))  // Süre kontrolü
                    .orElseThrow(() -> new RuntimeException("Token expired or not valid"));


            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(tokenValue);


            TokenSubject tokenSubject = mapper.readValue(claims.getBody().getSubject(), TokenSubject.class);

            User user = new User();
            user.setId(tokenSubject.id());
            user.setActive(tokenSubject.isActive());

            Set<Role> rolesAsSet = tokenSubject.roles().stream()
                    .map(Role::new)
                    .collect(Collectors.toSet());

            user.setRoles(rolesAsSet);
            return user;

        } catch (JwtException | JsonProcessingException e) {
            throw new RuntimeException("Token validation error: " + e.getMessage(), e);
        }
    }


    @Override
    @Transactional
    public void logout(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid authorization header");
        }

        String tokenValue = authorizationHeader.split(" ")[1];


        tokenRepository.findByToken(tokenValue).ifPresentOrElse(
                token -> {
                    tokenRepository.deleteByToken(tokenValue);
                },
                () -> {
                    throw new NotFoundException("Token not found");
                }
        );
    }

    public record TokenSubject(long id, boolean isActive, List<String> roles) {
    }
}
