package com.thiaghoul.ecommerce.service;

import com.thiaghoul.ecommerce.dto.Purchase;
import com.thiaghoul.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
