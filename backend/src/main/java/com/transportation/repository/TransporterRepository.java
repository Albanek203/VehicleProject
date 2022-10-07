package com.transportation.repository;

import com.transportation.entity.Transporter;
import com.transportation.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransporterRepository extends JpaRepository<Transporter, Long> {
    Optional<Transporter> findByUser(User user);
}
