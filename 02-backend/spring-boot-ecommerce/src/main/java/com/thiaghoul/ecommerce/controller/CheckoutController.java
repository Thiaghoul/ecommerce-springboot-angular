package com.thiaghoul.ecommerce.controller;

import com.thiaghoul.ecommerce.dto.Purchase;
import com.thiaghoul.ecommerce.dto.PurchaseResponse;
import com.thiaghoul.ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/apí/checkout")
public class CheckoutController {


    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){

        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
        return purchaseResponse;
    }
}
