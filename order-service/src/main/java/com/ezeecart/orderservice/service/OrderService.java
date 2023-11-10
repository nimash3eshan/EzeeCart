package com.ezeecart.orderservice.service;

import com.ezeecart.orderservice.dto.OrderLineItemsDto;
import com.ezeecart.orderservice.dto.OrderRequest;
import com.ezeecart.orderservice.exception.InsufficientStockException;
import com.ezeecart.orderservice.exception.ProductNotFoundException;
import com.ezeecart.orderservice.model.Order;
import com.ezeecart.orderservice.model.OrderLineItems;
import com.ezeecart.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.ArrayList;
import java.util.UUID;
import java.util.List;

@Service
@RequiredArgsConstructor

@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;//inject the orderLineItems to repo
    private final WebClient.Builder webClientBuilder; //inject the webclient to builder

    public void placeOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());
        order.setUserId(orderRequest.getUserId());

        List<OrderLineItems> orderLineItems = orderRequest.getOrderLineItemsDtoList()
                .stream()
                .map(this::mapToDto)
                .toList();

        order.setOrderLineItemsList(orderLineItems);

        // Flag to track if all products are validated successfully
        boolean allProductsValidated = true;

        // List to store the results of inventory deductions
        List<String> results = new ArrayList<>();

        // For each order line item, call the inventory service to validate and deduct the quantity
        for (OrderLineItems orderLineItem : orderLineItems) {
            boolean validationSuccessful = validateProduct(orderLineItem.getSkuCode(), orderLineItem.getQuantity());

            // If validation fails for any product, set the flag to false
            if (!validationSuccessful) {
                allProductsValidated = false;
                break; // No need to continue processing if validation fails for one product
            }
        }

        // If all products are validated successfully, proceed with deduction
        if (allProductsValidated) {
            for (OrderLineItems orderLineItem : orderLineItems) {
                String result = deductInventoryQuantity(orderLineItem.getSkuCode(), orderLineItem.getQuantity());
                results.add(result);
            }

            // If any of the results is not "Quantity deducted successfully," throw an exception
            List<String> failedProducts = results.stream()
                    .filter(result -> !result.equals("Quantity deducted successfully.")).toList();

            if (!failedProducts.isEmpty()) {
                throw new IllegalArgumentException("Failed to deduct quantity for the following products: " + failedProducts);
            }

            // If all the results are "Quantity deducted successfully," save the order
            orderRepository.save(order);
        }
    }

    private String deductInventoryQuantity(Long skuCode, int quantity) {
        log.info("Deducting quantity for product with skuCode " + skuCode + " and quantity " + quantity + ".");
        try {
            return webClientBuilder.build().put()
                    .uri("http://inventory-service/api/inventory/quan-deduction?productid=" + skuCode + "&quantityToDeduct=" + quantity)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (Exception exception) {
            if (exception instanceof WebClientResponseException responseException) {

                // Handle 404 response (Not Found) and throw a custom exception
                if (responseException.getStatusCode().equals(HttpStatus.NOT_FOUND)) {
                    throw new ProductNotFoundException("Product with skuCode " + skuCode + " not found in inventory.", exception);
                }

                // Handle 400 response (Bad Request) and throw a custom exception
                if (responseException.getStatusCode().equals(HttpStatus.BAD_REQUEST)) {
                    throw new InsufficientStockException("Insufficient stock for product with skuCode " + skuCode + ". Deduction not possible.", exception);
                }
            }

            // Handle other exceptions and throw a custom exception
            throw new RuntimeException("Exception occurred while calling inventory service to deduct quantity for product with skuCode " + skuCode + ".", exception);
        }
    }

    private boolean validateProduct(Long skuCode, int quantity) {
        try {
            webClientBuilder.build().post()
                    .uri("http://inventory-service/api/inventory/validate?productid=" + skuCode + "&quantityToDeduct=" + quantity)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            // If no exception is thrown, validation is successful
            return true;
        } catch (Exception exception) {
            // Handle exceptions and throw appropriate custom exceptions
            // (ProductNotFoundException, InsufficientStockException, etc.)
            handleValidationException(skuCode, exception);

            // If an exception is thrown, validation fails
            return false;
        }
    }

    private void handleValidationException(Long skuCode, Exception exception) {
        if (exception instanceof WebClientResponseException responseException) {
            if (responseException.getStatusCode().equals(HttpStatus.NOT_FOUND)) {
                throw new ProductNotFoundException("Validate - Product with skuCode " + skuCode + " not found in inventory.", exception);
            }

            if (responseException.getStatusCode().equals(HttpStatus.BAD_REQUEST)) {
                throw new InsufficientStockException("Validate - Insufficient stock for product with skuCode " + skuCode + ". Deduction not possible.", exception);
            }
        }

        throw new RuntimeException("Validate - Exception occurred while calling inventory service to deduct quantity for product with skuCode " + skuCode + ".", exception);
    }

    private OrderLineItems mapToDto(OrderLineItemsDto orderLineItemsDto){
        OrderLineItems orderLineItems=new OrderLineItems();
        orderLineItems.setPrice(orderLineItemsDto.getPrice());
        orderLineItems.setQuantity(orderLineItemsDto.getQuantity());
        orderLineItems.setSkuCode(orderLineItemsDto.getSkuCode());

        return orderLineItems;
    }

    public void deleteOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        orderRepository.delete(order);
    }
}