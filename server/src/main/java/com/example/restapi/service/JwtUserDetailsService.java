package com.example.restapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.restapi.dao.UserDao;
import com.example.restapi.model.DAOUser;
import com.example.restapi.model.UserDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		DAOUser user = userDao.findByUsername(username);

		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + username);
		} else {
			return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				new ArrayList<>());
		}
	}

	public DAOUser findUserByUsername(String username){
		DAOUser user = userDao.findByUsername(username);
		if(user == null){
			throw new UsernameNotFoundException("User not found with username: " + username);
		} else {
			return user;
		}
	}

	public DAOUser save(UserDTO user) {
		DAOUser newUser = new DAOUser();
		newUser.setUsername(user.getUsername());
		newUser.setName(user.getName());
		newUser.setPhone(user.getPhone());
		newUser.setPassword(bcryptEncoder.encode(user.getPassword()));

		return userDao.save(newUser);
	}


	public DAOUser update(int id, DAOUser user){
		DAOUser record = userDao.findById(id).orElse(null);
		
		if(record == null){
			return null;
		}

		record.setName(user.getName());
		record.setAddress(user.getAddress());
		record.setStatus(user.getStatus());
		record.setBirth(user.getBirth());
		record.setRole(user.getRole());
		record.setBio(user.getBio());
		record.setPhone(user.getPhone());
		record.setLastlogin(user.getLastlogin());

		userDao.save(record);

		return record;
	}

	public void deleteById(int id){
		userDao.deleteById(id);
	}

	public List<DAOUser> findAll(){
		return userDao.findAll();
	}

	public Optional<DAOUser> findById(int id){
		return userDao.findById(id);
	}
}