package org.example.controller;

import org.example.model.Delivery;
import org.example.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/deliveries")
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

    @GetMapping("/")
    public Optional<Delivery> getDeliveryById(@RequestParam(name = "deliveryId") Long deliveryId) {
        return deliveryService.getDeliveryById(deliveryId);
    }

    @PostMapping
    public Delivery createDelivery(@RequestBody Delivery delivery) {
        return deliveryService.createDelivery(delivery);
    }

    @PutMapping
    public Delivery updateDelivery(@RequestParam(name = "deliveryId") Long deliveryId, @RequestBody Delivery newDelivery) {
        // Ensure the IDs match for updating
        newDelivery.setDeliveryId(deliveryId);
        return deliveryService.updateDelivery(newDelivery);
    }

    @GetMapping("/byOrder")
    public List<Delivery> getDeliveriesByOrderId(@RequestParam(name = "orderId") Long orderId) {
        return deliveryService.getDeliveriesByOrderId(orderId);
    }

    @GetMapping("/byUser")
    public List<Delivery> getDeliveriesByUserId(@RequestParam(name = "userId") Long userId) {
        return deliveryService.getDeliveriesByUserId(userId);
    }

    @DeleteMapping
    public void deleteDelivery(@RequestParam(name = "deliveryId") Long deliveryId) {
        deliveryService.deleteDelivery(deliveryId);
    }

    // Additional endpoints for other operations related to deliveries can be added as needed
}
