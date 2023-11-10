package com.ezeecart.orderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data//include all the getter and setters
@AllArgsConstructor
@NoArgsConstructor
public class OrderLineItemsDto {
    private Long id;
    private Long skuCode;
    private BigDecimal price;
    private Integer quantity;

}