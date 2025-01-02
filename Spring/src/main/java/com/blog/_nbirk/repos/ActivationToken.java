package com.blog._nbirk.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivationToken extends JpaRepository<com.blog._nbirk.entities.ActivationToken,Long> {
}
