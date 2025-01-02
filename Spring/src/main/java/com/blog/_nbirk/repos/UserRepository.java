package com.blog._nbirk.repos;

import com.blog._nbirk.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail (String email);

    User findByActivationToken (String token);

    Page<User> findByIdNot(long id, Pageable page);

    User findByPasswordResetToken(String passwordResetToken);

    List<User> findByNameStartingWith(String name);

    List<User> findByNameContainingIgnoreCaseOrLastnameContainingIgnoreCase(String firstName, String lastName);

    List<User> findByUsernameContainingIgnoreCase(String username);

    @Query("SELECT COUNT(u) FROM User u WHERE u.createdAt >= :startDate")
    long countUsersCreatedAfter(LocalDateTime startDate);
}
