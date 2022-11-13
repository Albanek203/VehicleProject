package com.transportation.repository;

import com.transportation.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query("""
                SELECT u FROM User u
                WHERE (:id IS NULL OR u.id = :id)
                AND (:name IS NULL OR LOWER(u.name) LIKE CONCAT('%', LOWER(:name), '%'))
                AND (:surname IS NULL OR LOWER(u.surname) LIKE CONCAT('%', LOWER(:surname), '%'))
                AND (:email IS NULL OR LOWER(u.email) LIKE CONCAT('%', LOWER(:email), '%'))          
            """)
    Page<User> findAllBy(Long id, String name, String surname, String email, Pageable pageable);
}
