package com.ezeecart.orderservice.controller;

import com.ezeecart.orderservice.dto.OrderRequest;
import com.ezeecart.orderservice.model.Order;
import com.ezeecart.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String placeOrder(@RequestBody OrderRequest orderRequest){
        orderService.placeOrder(orderRequest);
        return "order placed successfully";
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String deleteOrder(@PathVariable Long orderId){
        orderService.deleteOrder(orderId);
        return "order deleted successfully";
    }


    @GetMapping("/")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping
    public ResponseEntity<?> getOrderById(@RequestParam(required = false) Long orderId,
                                          @RequestParam(required = false) String userId) {
        if (orderId != null) {
            Optional<Order> order = orderService.getOrderById(orderId);
            return order.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } else if (userId != null) {
            List<Order> orders = orderService.getOrdersByUserId(userId);
            return ResponseEntity.ok(orders);
        } else {
            // Handle invalid request with neither orderId nor userId
            return ResponseEntity.badRequest().body("Invalid request. Provide either orderId or userId.");
        }
    }


}
