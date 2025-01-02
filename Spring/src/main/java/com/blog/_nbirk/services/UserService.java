package com.blog._nbirk.services;

import com.blog._nbirk.configuration.CurrentUser;
import com.blog._nbirk.configuration.UserRole;
import com.blog._nbirk.dto.UserDTO;
import com.blog._nbirk.entities.Role;
import com.blog._nbirk.entities.User;
import com.blog._nbirk.exceptions.ActivationNotificationException;
import com.blog._nbirk.exceptions.InvalidTokenException;
import com.blog._nbirk.exceptions.NotFoundException;
import com.blog._nbirk.exceptions.NotUniqueEmailException;
import com.blog._nbirk.mail.EmailService;
import com.blog._nbirk.repos.UserRepository;
import com.blog._nbirk.requests.UserUpdateRequest;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.context.annotation.Lazy;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Validated
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final RoleService roleService;
    private final PasswordResetService passwordResetService;

    UserService(UserRepository userRepository,EmailService emailService,RoleService roleService,@Lazy PasswordResetService passwordResetService){
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.roleService = roleService;
        this.passwordResetService = passwordResetService;
    }
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Transactional(rollbackFor = {Exception.class, MailException.class})
    public void save(User user){
        try {

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setActivationToken(UUID.randomUUID().toString());
            Role userRole = roleService.getRoleByUserRole(UserRole.ROLE_USER);
            user.getRoles().add(userRole);

            userRepository.saveAndFlush(user);
            emailService.sendActivationMail(user.getEmail(), user.getActivationToken(),user.getUsername());
        }
        catch (DataIntegrityViolationException exception){
            throw new NotUniqueEmailException();
        }catch (MailException exception){
            throw new ActivationNotificationException();
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void activateUser(String token) {
        User inDB = userRepository.findByActivationToken(token);
        if (inDB == null){
            throw new InvalidTokenException();
        }
        inDB.setActive(true);
        inDB.setActivationToken(null);
        userRepository.save(inDB);
    }

    public void resetPassword(String token, String newPassword) throws MessagingException {

        boolean isValid = passwordResetService.validatePasswordToken(token);
        if (isValid) {
            User user = userRepository.findByPasswordResetToken(token);
            if (user != null) {
                user.setPassword(passwordEncoder.encode(newPassword));
                emailService.sendPasswordChangedMail(user.getEmail(),user.getUsername());
                userRepository.save(user);
            } else {
                throw new IllegalStateException("User not found for the given token");
            }
        } else {
            throw new IllegalStateException("Invalid token");
        }
    }


    public Page<User> getUsers(Pageable page, CurrentUser currentUser) {
        if(currentUser == null) {
            return userRepository.findAll(page);
        }
        return userRepository.findByIdNot(currentUser.getId(), page);
    }

    public User getUser(long id){
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }

    public User findByEmail(String email){
        return  userRepository.findByEmail(email);
    }

    @Transactional
    public User updateUser(long id, @Valid UserUpdateRequest userUpdate) {
        User user = getUser(id);

        userUpdate.username().ifPresent(user::setUsername);
        userUpdate.name().ifPresent(user::setName);
        userUpdate.lastname().ifPresent(user::setLastname);
        userUpdate.language().ifPresent(user::setLanguage);
        userUpdate.country().ifPresent(user::setCountry);

        return userRepository.save(user);
    }

    public List<User> getUsersByIds(List<Long> usersId) {
        return userRepository.findAllById(usersId);
    }

    public List<UserDTO> searchUsers(String query) {
        List<User> users;

        if (query.startsWith("@")) {
            String username = query.substring(1);
            users = userRepository.findByUsernameContainingIgnoreCase(username);
        } else if (query.length() >= 2) {

            users = userRepository.findByNameContainingIgnoreCaseOrLastnameContainingIgnoreCase(query, query);
        } else {

            return new ArrayList<>();
        }


        return users.stream().map(user -> {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setUsername(user.getUsername());
            userDTO.setName(user.getName());
            userDTO.setLastname(user.getLastname());
            return userDTO;
        }).collect(Collectors.toList());
    }

    public long getTotalUserCount() {
        return userRepository.count();
    }

    public long getMonthlyUserIncrease() {
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        return userRepository.countUsersCreatedAfter(thirtyDaysAgo);
    }

    //ROLES

    @Transactional
    public void assignRoleToUser(Long userId, UserRole role) {
        try {
            System.out.println("Attempting to find user with ID: " + userId);
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new NotFoundException("User not found"));

            Role roleEntity = roleService.getRoleByUserRole(role);
            if (roleEntity == null) {
                throw new NotFoundException("Role not found");
            }

            user.getRoles().add(roleEntity);
            userRepository.save(user);
            System.out.println("Role assigned successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }


    @Transactional
    public void removeRoleFromUser(Long userId, UserRole role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Role roleEntity = roleService.getRoleByUserRole(role);

        if (roleEntity == null) {
            throw new NotFoundException("Role not found");
        }

        user.getRoles().remove(roleEntity);
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public Set<UserRole> getUserRoles(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return user.getRoles()
                .stream()
                .map(Role::getRole)
                .collect(Collectors.toSet());
    }
}
