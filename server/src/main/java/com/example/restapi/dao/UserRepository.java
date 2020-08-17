package com.example.restapi.dao;

import com.example.restapi.model.UserDAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<UserDAO, Integer> {
    UserDAO findByUsername(String username);
    List<UserDAO> findByNameContainingIgnoreCase(String name);
}