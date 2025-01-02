package com.blog._nbirk.controllers;

import com.blog._nbirk.configuration.CurrentUser;
import com.blog._nbirk.configuration.RoleEditor;
import com.blog._nbirk.configuration.UserRole;
import com.blog._nbirk.dto.UserDTO;
import com.blog._nbirk.entities.User;
import com.blog._nbirk.requests.UserCreateRequest;
import com.blog._nbirk.requests.UserUpdateRequest;
import com.blog._nbirk.services.AuthService;
import com.blog._nbirk.services.UserService;
import com.blog._nbirk.shared.GenericMessage;
import com.blog._nbirk.shared.Messages;
import jakarta.validation.Valid;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;
    private final AuthService authService;

    UserController(UserService userService, AuthService authService){
        this.userService = userService;
        this.authService = authService;
    }

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.registerCustomEditor(UserRole.class, new RoleEditor());
    }

    /* CRUD */

    @PostMapping("/create")
    GenericMessage createUser(@Valid @RequestBody UserCreateRequest user){
        String userCreated = Messages.getMessageForLocale("nbirk.constraint.create.user.success.message", LocaleContextHolder.getLocale());
        userService.save(user.toUser());
        return new GenericMessage(userCreated);
    }

    @PatchMapping("/{token}/validate")
    GenericMessage activateUser(@PathVariable String token){
        userService.activateUser(token);
        String userCreated = Messages.getMessageForLocale("nbirk.activate.user.success.message", LocaleContextHolder.getLocale());
        return new GenericMessage(userCreated);
    }

    @GetMapping("/get")
    public Page<UserDTO> getUsers(
            @PageableDefault(page = 1, size = 6) Pageable page,
            CurrentUser currentUser) {

        return userService.getUsers(page, currentUser).map(UserDTO::new);
    }

    @GetMapping("/{id}")
    UserDTO getUserById(@PathVariable long id){
        return new UserDTO(userService.getUser(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @RequestBody UserUpdateRequest userUpdate,
            @RequestHeader(name = "Authorization", required = false) String authorizationHeader) {

        User authenticatedUser = authService.verifyToken(authorizationHeader);
        if (authenticatedUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new GenericMessage("Invalid token"));
        }

        User updatedUser = userService.updateUser(authenticatedUser.getId(), userUpdate);
        return ResponseEntity.ok(new UserDTO(updatedUser));
    }


    // INFOS
    @GetMapping("/user-count")
    public long getTotalUserCount() {
        return userService.getTotalUserCount();
    }

    @GetMapping("/user-monthly-increase")
    public long getMonthlyUserIncrease() {
        return userService.getMonthlyUserIncrease();
    }

    //ROLES
    @PostMapping("/{userId}/roles/{role}")
    public ResponseEntity<String> assignRole(@PathVariable Long userId, @PathVariable String role) {
        System.out.println("Attempting to find user with ID: " + userId);
        UserRole userRole = UserRole.valueOf(role.toUpperCase());
        userService.assignRoleToUser(userId, userRole);
        return ResponseEntity.ok("Role assigned successfully.");
    }

    @DeleteMapping("/{userId}/roles/{role}")
    public ResponseEntity<String> removeRole(@PathVariable Long userId, @PathVariable String role) {
        UserRole userRole = UserRole.valueOf(role.toUpperCase());
        userService.removeRoleFromUser(userId, userRole);
        return ResponseEntity.ok("Role removed successfully.");
    }

    @GetMapping("/{userId}/roles")
    public ResponseEntity<Set<UserRole>> getUserRoles(@PathVariable Long userId) {
        Set<UserRole> roles = userService.getUserRoles(userId);
        return ResponseEntity.ok(roles);
    }
}
