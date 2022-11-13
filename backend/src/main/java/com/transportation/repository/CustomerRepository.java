package com.transportation.repository;

import com.transportation.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("""
                SELECT c FROM Customer c
                WHERE (:id IS NULL OR c.id = :id)
                AND (:name IS NULL OR LOWER(c.name) LIKE CONCAT('%',LOWER(:name),'%'))
                AND (:phone IS NULL OR LOWER(c.phone) LIKE CONCAT('%',LOWER(:phone),'%'))
                AND (:userId IS NULL OR c.user.id = :userId)
            """)
    Page<Customer> findAllBy(Long id, String name, String phone, Long userId, Pageable pageable);
}
