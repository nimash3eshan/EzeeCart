package com.ezeecart.orderservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "t_order_line_items")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderLineItems {
    @Id// id for the oder
    @GeneratedValue(strategy = GenerationType.IDENTITY)//auto increment the primary key value
    private Long id;
    private Long skuCode;
    private BigDecimal price;
    private Integer quantity;
}

