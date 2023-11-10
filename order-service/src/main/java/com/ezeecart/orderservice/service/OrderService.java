package com.ezeecart.orderservice.service;

import com.ezeecart.orderservice.dto.OrderLineItemsDto;
import com.ezeecart.orderservice.dto.OrderRequest;
import com.ezeecart.orderservice.model.Order;
import com.ezeecart.orderservice.model.OrderLineItems;
import com.ezeecart.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.UUID;
import java.util.List;

@Service
@RequiredArgsConstructor
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

        //todo: call inventory service and place order if products are available

        orderRepository.save(order);
    }

    private OrderLineItems mapToDto(OrderLineItemsDto orderLineItemsDto){
        OrderLineItems orderLineItems=new OrderLineItems();
        orderLineItems.setPrice(orderLineItemsDto.getPrice());
        orderLineItems.setQuantity(orderLineItemsDto.getQuantity());
        orderLineItems.setSkuCode(orderLineItemsDto.getSkuCode());

        return orderLineItems;
    }
}