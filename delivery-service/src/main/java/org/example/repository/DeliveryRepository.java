package org.example.repository;

import org.example.model.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    // Define custom queries if needed
    List<Delivery> findByOrderId(Long orderId);
    List<Delivery> findByUserId(Long userId);

}
