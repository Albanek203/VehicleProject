package com.transportation.repository;

import com.transportation.entity.Delivery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    @Query("""
                SELECT d FROM Delivery d 
                WHERE (:id IS NULL OR d.id = :id) 
                AND (:customerId IS NULL OR d.customer.id = :customerId)
                AND (:price IS NULL OR d.price = :price)
                AND (:addressFrom IS NULL OR LOWER(d.addressFrom.country) LIKE CONCAT('%', LOWER(:addressFrom), '%')
                                          OR LOWER(d.addressFrom.city) LIKE CONCAT('%', LOWER(:addressFrom), '%')
                                          OR LOWER(d.addressFrom.street) LIKE CONCAT('%', LOWER(:addressFrom), '%'))
                AND (:addressTo IS NULL OR LOWER(d.addressTo.country) LIKE CONCAT('%', LOWER(:addressTo), '%')
                                        OR LOWER(d.addressTo.city) LIKE CONCAT('%', LOWER(:addressTo), '%')
                                        OR LOWER(d.addressTo.street) LIKE CONCAT('%', LOWER(:addressTo), '%'))
                AND (:description IS NULL OR LOWER(d.description) LIKE CONCAT('%', LOWER(:description), '%'))        
                AND (:searchTerm IS NULL OR LOWER(d.description) LIKE CONCAT('%', LOWER(:searchTerm),'%')
                                         OR LOWER(d.addressFrom.country) LIKE CONCAT('%', LOWER(:searchTerm),'%')
                                         OR LOWER(d.addressFrom.city) LIKE CONCAT('%', LOWER(:searchTerm),'%')
                                         OR LOWER(d.addressFrom.street) LIKE CONCAT('%', LOWER(:searchTerm),'%')
                                         OR LOWER(d.addressTo.country) LIKE CONCAT('%', LOWER(:searchTerm),'%')
                                         OR LOWER(d.addressTo.city) LIKE CONCAT('%', LOWER(:searchTerm),'%')
                                         OR LOWER(d.addressTo.street) LIKE CONCAT('%', LOWER(:searchTerm),'%')
                                         OR LOWER(d.status) LIKE CONCAT('%', LOWER(:searchTerm),'%')
                                         OR LOWER(d.customer.name) LIKE CONCAT('%', LOWER(:searchTerm),'%'))       
            """)
    Page<Delivery> findAllBy(Long id, String addressFrom, String addressTo, String description, Long customerId, Long price, String searchTerm, Pageable pageable);
}
