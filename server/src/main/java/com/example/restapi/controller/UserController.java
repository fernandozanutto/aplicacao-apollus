package com.example.restapi.controller;

import com.example.restapi.model.UserDAO;
import com.example.restapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userDetailsService;

    @GetMapping("/users")
    public List<UserDAO> getUsersByName(@RequestParam(defaultValue="") String name){
        return userDetailsService.findByNameContaining(name);
    }


    @GetMapping("/users/{id}")
    public ResponseEntity<?> findById(@PathVariable int id){

        UserDAO a = userDetailsService.findById(id).orElse(null);

        if(a == null){
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(a);
        }
    }


    @PutMapping(value = "users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody UserDAO user){
        UserDAO record = userDetailsService.update(id, user);
        if(record == null){
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(record);
    }

    @PostMapping(value = "users")
    public ResponseEntity<?> createUser(@RequestBody UserDAO user){

        UserDAO newUser = userDetailsService.create(user);

        if(newUser.getId() != 0){
            return ResponseEntity.ok().body(newUser.getId());
        }

        return ResponseEntity.badRequest().build();
    }


    @DeleteMapping(value = "users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        UserDAO user = userDetailsService.findById(id).orElse(null);

        if(user == null){
            return ResponseEntity.notFound().build();
        } else {
            userDetailsService.deleteById(id);

            return ResponseEntity.ok().build();
        }
    }
}
