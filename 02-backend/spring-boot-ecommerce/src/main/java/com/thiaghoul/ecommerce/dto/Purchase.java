package com.thiaghoul.ecommerce.dto;

import com.thiaghoul.ecommerce.entities.*;

import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
    private String email;

}
