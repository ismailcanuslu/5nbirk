package com.blog._nbirk.services;

import com.blog._nbirk.entities.Role;
import com.blog._nbirk.configuration.UserRole;
import com.blog._nbirk.repos.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {
    private final RoleRepository roleRepository;
    RoleService(RoleRepository roleRepository){
        this.roleRepository = roleRepository;
    }
    public Role getRoleByUserRole(UserRole userRole) {
        Optional<Role> roleOptional = roleRepository.findByRole(userRole);

        return roleOptional.orElseThrow(() -> new RuntimeException("Role not found"));
    }
}
