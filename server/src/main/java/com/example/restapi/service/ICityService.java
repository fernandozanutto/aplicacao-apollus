package com.example.restapi.service;

import java.util.List;
import com.example.restapi.model.City;

public interface ICityService {

    List<City> findByNameEndsWith(String name);
}