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
    private final WebClient webClient;

    public void placeOrder(OrderRequest orderRequest){
        Order order=new Order();
        order.setOrderNumber(UUID.randomUUID().toString());


        List<OrderLineItems> orderLineItems=orderRequest.getOrderLineItemsDtoList()
                .stream()
                .map(this ::mapToDto)
                .toList();

        order.setOrderLineItemsList(orderLineItems);

        //todo: call inventory service and place order

        // List to store the results of inventory deductions
        List<String> results = new ArrayList<>();

        // For each order line item, call the inventory service to deduct the quantity
        for (OrderLineItems orderLineItem : orderLineItems) {
            validateProduct(orderLineItem.getSkuCode(), orderLineItem.getQuantity());
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

    private String deductInventoryQuantity(Long skuCode, int quantity) {
        log.info("Deducting quantity for product with skuCode " + skuCode + " and quantity " + quantity + ".");
        try {
            return webClient.put()
                    .uri("http://localhost:8082/api/inventory/quan-deduction?productid=" + skuCode + "&quantityToDeduct=" + quantity)
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

    private void validateProduct(Long skuCode, int quantity) {
        try {
            webClient.post()
                    .uri("http://localhost:8082/api/inventory/validate?productid=" + skuCode + "&quantityToDeduct=" + quantity)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
        } catch (Exception exception) {
            if (exception instanceof WebClientResponseException responseException) {

                // Handle 404 response (Not Found) and throw a custom exception
                if (responseException.getStatusCode().equals(HttpStatus.NOT_FOUND)) {
                    throw new ProductNotFoundException("Validate - Product with skuCode " + skuCode + " not found in inventory.", exception);
                }

                // Handle 400 response (Bad Request) and throw a custom exception
                if (responseException.getStatusCode().equals(HttpStatus.BAD_REQUEST)) {
                    throw new InsufficientStockException("Validate - Insufficient stock for product with skuCode " + skuCode + ". Deduction not possible.", exception);
                }
            }
            // Handle other exceptions and throw a custom exception
            throw new RuntimeException("Validate - Exception occurred while calling inventory service to deduct quantity for product with skuCode " + skuCode + ".", exception);
        }
    }

    private OrderLineItems mapToDto(OrderLineItemsDto orderLineItemsDto){
        OrderLineItems orderLineItems=new OrderLineItems();
        orderLineItems.setPrice(orderLineItemsDto.getPrice());
        orderLineItems.setQuantity(orderLineItemsDto.getQuantity());
        orderLineItems.setSkuCode(orderLineItemsDto.getSkuCode());

        return orderLineItems;
    }
}