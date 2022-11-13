package com.transportation.repository;

import com.transportation.entity.Transporter;
import com.transportation.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransporterRepository extends JpaRepository<Transporter, Long> {
    Optional<Transporter> findByUser(User user);

    @Query("""
                SELECT t FROM Transporter t
                WHERE (:id IS NULL OR t.id = :id)
                AND (:name IS NULL OR LOWER(t.name) LIKE CONCAT('%',LOWER(:name),'%'))
                AND (:phone IS NULL OR LOWER(t.phone) LIKE CONCAT('%',LOWER(:phone),'%'))
                AND (:userId IS NULL OR t.user.id = :userId)
            """)
    Page<Transporter> findAllBy(Long id, String name, String phone, Long userId, Pageable pageable);
}
