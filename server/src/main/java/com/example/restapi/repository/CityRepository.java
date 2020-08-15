package com.example.restapi.repository;

import java.util.List;

import com.example.restapi.model.City;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository<City, Integer> {

    @Query("select c from City c where c.name like %?1")
    List<City> findByNameEndsWith(String chars);
}