package com.transportation.repository;

import com.transportation.entity.Delivery;
import com.transportation.entity.Offer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    @Query("""
                SELECT o FROM Offer o 
                WHERE (:id IS NULL OR o.id = :id) 
               AND (:description IS NULL OR LOWER(o.description) LIKE CONCAT('%',LOWER(:description),'%'))
               AND (:status IS NULL OR LOWER(o.status) LIKE CONCAT('%',LOWER(:status),'%'))
               AND (:deliveryId IS NULL OR o.delivery.id = :deliveryId)
               AND (:transporterId IS NULL OR o.transporter.id = :transporterId)     
               AND (:searchTerm IS NULL OR LOWER(o.description) LIKE CONCAT('%', LOWER(:searchTerm),'%')
                                         OR LOWER(o.status) LIKE CONCAT('%', LOWER(:searchTerm),'%')
                                         OR LOWER(o.transporter.name) LIKE CONCAT('%', LOWER(:searchTerm),'%')
                                         OR LOWER(o.delivery.customer.name) LIKE CONCAT('%', LOWER(:searchTerm),'%'))                                             
            """)
    Page<Offer> findAllBy(Long id, String description, String status, Long deliveryId, Long transporterId, String searchTerm, Pageable pageable);
}
