package com.example.restapi.model;

import lombok.Data;

@Data
public class UserDTO {

    private String username;
    private String password;
    private String name;
    private String phone;
}