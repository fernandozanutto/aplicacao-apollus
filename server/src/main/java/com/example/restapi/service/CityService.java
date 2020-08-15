package com.example.restapi.service;

import java.util.List;

import com.example.restapi.model.City;
import com.example.restapi.repository.CityRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityService implements ICityService {
    
    @Autowired
    private CityRepository repository;

    @Override
    public List<City> findByNameEndsWith(String name) {
        var cities = (List<City>) repository.findByNameEndsWith(name);
        return cities;
    }
}