package com.thiaghoul.ecommerce.dto;

import com.thiaghoul.ecommerce.entities.Address;
import com.thiaghoul.ecommerce.entities.Customer;

import com.thiaghoul.ecommerce.entities.Order;
import com.thiaghoul.ecommerce.entities.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
