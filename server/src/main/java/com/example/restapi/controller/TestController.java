package com.example.restapi.controller;

import java.util.List;

import com.example.restapi.dao.UserDao;
import com.example.restapi.model.DAOUser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

	@Autowired
	private UserDao userDao;

	@RequestMapping({ "/hello" })
	public String firstPage() {
		return "Hello World";
	}

	@GetMapping("/test")
	public List<DAOUser> getUsers(){

		List<DAOUser> users = userDao.findAll();

		return users;
	}

}