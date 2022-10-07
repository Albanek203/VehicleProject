package com.transportation.repository;

import com.transportation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String name);

    @Query("SELECT count(c) > 0 FROM User c where c.email = ?1")
    boolean existsByEmail(String email);
}
