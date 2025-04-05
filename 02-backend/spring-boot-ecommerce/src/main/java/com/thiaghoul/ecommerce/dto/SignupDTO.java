package com.thiaghoul.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class SignupDTO {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
