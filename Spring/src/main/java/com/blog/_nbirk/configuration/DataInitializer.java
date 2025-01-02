package com.blog._nbirk.configuration;

import com.blog._nbirk.entities.Role;
import com.blog._nbirk.repos.RoleRepository;
import org.springframework.boot.CommandLineRunner;

public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    DataInitializer(RoleRepository roleRepository){
        this.roleRepository = roleRepository;
    }
    @Override
    public void run(String... args) throws Exception {
        addRoles();
    }
    private void addRoles() {
        if (roleRepository.count() == 0) {
            roleRepository.save(new Role(UserRole.ROLE_USER));
            roleRepository.save(new Role(UserRole.ROLE_MODERATOR));
            roleRepository.save(new Role(UserRole.ROLE_ADMIN));
        }
    }
}
