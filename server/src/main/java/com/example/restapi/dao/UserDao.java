package com.example.restapi.dao;

import com.example.restapi.model.DAOUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserDao extends JpaRepository<DAOUser, Integer> {
    DAOUser findByUsername(String username);
}