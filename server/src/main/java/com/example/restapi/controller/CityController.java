package com.example.restapi.controller;

import java.util.List;

import com.example.restapi.model.City;
import com.example.restapi.service.ICityService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CityController {

    @Autowired
    ICityService cityService;

    @GetMapping("/teste")
    public List<City> findCitiesNameEndsWith(@RequestParam (value = "name", defaultValue = "") String name) {

        var cities = (List<City>) cityService.findByNameEndsWith(name);

        return cities;
    }
    
}