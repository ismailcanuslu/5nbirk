package com.blog._nbirk.entities;

import com.blog._nbirk.configuration.UserRole;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;

@Entity
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    public Role(UserRole role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Role(){}
    public Role(String roleName) {
        try {
            this.role = UserRole.valueOf(roleName);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Geçersiz rol adı: " + roleName, e);
        }
    }


    @Override
    public String getAuthority() {
        return role.name();
    }
}
