package com.example.restapi.controller;


import com.example.restapi.model.User;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/users")
    public User[] getUsers(){
            
        User[] users = {
            new User(1, "fernando", "a@a.com", "minha bio aqui oljaa iiii", "123", User.Type.Admin),
            new User(2, "leonardo", "b@b.com", "uauauaaua", "123", User.Type.User),
        };

        return users;
    }

    @GetMapping("/login")
    public boolean loginUser(){
        return true;
    }
}