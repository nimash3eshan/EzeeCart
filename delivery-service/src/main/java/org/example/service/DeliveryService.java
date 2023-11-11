package org.example.service;

import org.example.model.Delivery;
import org.example.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    @Autowired
    public DeliveryService(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    public Optional<Delivery> getDeliveryById(Long deliveryId) {
        return deliveryRepository.findById(deliveryId);
    }

    public Delivery createDelivery(Delivery delivery) {
        return deliveryRepository.save(delivery);
    }

    public List<Delivery> getDeliveriesByOrderId(Long orderId) {
        return deliveryRepository.findByOrderId(orderId);
    }

    public List<Delivery> getDeliveriesByUserId(Long userId) {
        return deliveryRepository.findByUserId(userId);
    }

    public Delivery updateDelivery(Delivery newDelivery) {
        return deliveryRepository.save(newDelivery);
    }

    public void deleteDelivery(Long deliveryId) {
        deliveryRepository.deleteById(deliveryId);
    }

    // Additional methods for managing deliveries can be added as needed
}
