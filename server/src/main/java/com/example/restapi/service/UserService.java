package com.example.restapi.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.restapi.dao.UserRepository;
import com.example.restapi.model.UserDAO;
import com.example.restapi.model.UserDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		UserDAO user = userRepository.findByUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		} else {
			return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
		}
	}

	public UserDAO findUserByUsername(String username){
		UserDAO user = userRepository.findByUsername(username);
		if(user == null){
			throw new UsernameNotFoundException("User not found with username: " + username);
		} else {
			return user;
		}
	}

	public UserDAO save(UserDTO user) {
		UserDAO newUser = new UserDAO();
		newUser.setUsername(user.getUsername());
		newUser.setName(user.getName());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));

		return userRepository.save(newUser);
	}

	public UserDAO create(UserDAO user) {
		user.setPassword(bcryptEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}


	public UserDAO update(int id, UserDAO user){
		UserDAO record = userRepository.findById(id).orElse(null);

		if(record == null){
			return null;
		}

		record.setName(user.getName());
		record.setUsername(user.getUsername());
		record.setAddress(user.getAddress());
		record.setStatus(user.getStatus());
		record.setBirth(user.getBirth());
		record.setRole(user.getRole());
		record.setBio(user.getBio());
		record.setPhone(user.getPhone());
		record.setLastlogin(user.getLastlogin());
		record.setType(user.getType());

		if(user.getPassword() != null && !user.getPassword().equals(""))
			record.setPassword(bcryptEncoder.encode(user.getPassword()));

		userRepository.save(record);

		return record;
	}

	public void deleteById(int id){
		userRepository.deleteById(id);
	}

	public List<UserDAO> findAll(){
		return userRepository.findAll();
	}

	public List<UserDAO> findByNameContaining(String name){
		return userRepository.findByNameContainingIgnoreCase(name);
	}


	public Optional<UserDAO> findById(int id){
		return userRepository.findById(id);
	}

	public void updateLastLogin(int id) {
		UserDAO record = userRepository.findById(id).orElse(null);

		if(record != null){
			record.setLastlogin(LocalDateTime.now());
			userRepository.save(record);
		}
	}
}