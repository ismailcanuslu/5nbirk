package com.blog._nbirk.validation;

import com.blog._nbirk.entities.User;
import com.blog._nbirk.repos.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail,String> {
    private UserRepository userRepository;
    UniqueEmailValidator(UserRepository userRepository){
        this.userRepository = userRepository;
    }
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        User inDB = userRepository.findByEmail(value);
        return inDB == null;
    }
}
