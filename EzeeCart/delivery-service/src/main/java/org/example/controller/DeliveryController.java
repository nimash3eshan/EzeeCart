package org.example.controller;

import org.example.model.Delivery;
import org.example.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/deliveries")
public class DeliveryController {

    private final DeliveryService deliveryService;

    @Autowired
    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @GetMapping
    public List<Delivery> getAllDeliveries() {
        return deliveryService.getAllDeliveries();
    }

    @GetMapping("/{deliveryId}")
    public Optional<Delivery> getDeliveryById(@PathVariable Long deliveryId) {
        return deliveryService.getDeliveryById(deliveryId);
    }

    @PostMapping
    public Delivery createDelivery(@RequestBody Delivery delivery) {
        return deliveryService.createDelivery(delivery);
    }

    @PutMapping("/{deliveryId}")
    public Delivery updateDelivery(@PathVariable Long deliveryId, @RequestBody Delivery newDelivery) {
        // Ensure the IDs match for updating
        newDelivery.setDeliveryId(deliveryId);
        return deliveryService.updateDelivery(newDelivery);
    }

    @DeleteMapping("/{deliveryId}")
    public void deleteDelivery(@PathVariable Long deliveryId) {
        deliveryService.deleteDelivery(deliveryId);
    }

    // Additional endpoints for other operations related to deliveries can be added as needed
}
