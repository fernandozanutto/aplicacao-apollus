package com.example.restapi.dao;

import com.example.restapi.model.UserDAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<UserDAO, Integer> {
    UserDAO findByUsername(String username);
}