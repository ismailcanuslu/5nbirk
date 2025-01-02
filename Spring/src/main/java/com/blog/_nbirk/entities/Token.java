package com.blog._nbirk.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

@Entity
@Table(name ="token")
public class Token {
    @Transient
    String prefix = "Bearer";

    @Id
    String token;

    @JsonIgnore
    LocalDateTime expiresAt;



    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public String getPrefix() {
        return prefix;
    }
    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Token(String prefix, String token, User user) {
        this.prefix = prefix;
        this.token = token;
        this.user = user;
        this.expiresAt = LocalDateTime.now().plusDays(5);
    }

    public Token() {
    }
}
