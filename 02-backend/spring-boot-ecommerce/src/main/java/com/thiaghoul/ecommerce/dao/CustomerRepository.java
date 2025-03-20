package com.thiaghoul.ecommerce.dao;

import com.thiaghoul.ecommerce.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

}
