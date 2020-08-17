package com.example.restapi.controller;

import java.util.List;

import com.example.restapi.config.JwtTokenUtil;
import com.example.restapi.model.UserDAO;
import com.example.restapi.model.JwtRequest;
import com.example.restapi.model.JwtResponse;
import com.example.restapi.model.UserDTO;
import com.example.restapi.service.UserService;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserService userDetailsService;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}

	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception {
		return ResponseEntity.ok(userDetailsService.save(user));
	}


	@GetMapping("/users")
	public List<UserDAO> getUsers(){
		return userDetailsService.findAll();
	}

	@GetMapping("/me")
	public ResponseEntity<?> getMe(@RequestHeader("authorization") final String jwt){

		String username = null;
		String jwtToken = null;

		if (jwt != null && jwt.startsWith("Bearer ")) {
			jwtToken = jwt.substring(7);
			try {
				username = jwtTokenUtil.getUsernameFromToken(jwtToken);
				UserDAO user = userDetailsService.findUserByUsername(username);
				return ResponseEntity.ok().body(user);

			} catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
			} catch (ExpiredJwtException e) {
				System.out.println("JWT Token has expired");
			}
		}
		return null;
	}

	@GetMapping("/check-jwt")
	public ResponseEntity<?> checkJWT(@RequestHeader("authorization") final String jwt){

		String username = null;
		String jwtToken = null;

		if (jwt != null && jwt.startsWith("Bearer ")) {
			jwtToken = jwt.substring(7);
			try {
				username = jwtTokenUtil.getUsernameFromToken(jwtToken);
				UserDAO user = userDetailsService.findUserByUsername(username);
				return ResponseEntity.ok().body(true);

			} catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
			} catch (ExpiredJwtException e) {
				System.out.println("JWT Token has expired");
			}
		}


		return null;
	}

	@GetMapping("/check-permission/{id}")
	public ResponseEntity<?> getEditAcess(@PathVariable int id, @RequestHeader("authorization") final String jwt){

		String username = null;
		String jwtToken = null;

		if (jwt != null && jwt.startsWith("Bearer ")) {
			jwtToken = jwt.substring(7);
			try {
				username = jwtTokenUtil.getUsernameFromToken(jwtToken);
				UserDAO myUser = userDetailsService.findUserByUsername(username);

				UserDAO accessedUser = userDetailsService.findById(id).orElse(null);

				if(accessedUser == null){
					return new ResponseEntity<String>("Não autorizado", HttpStatus.FORBIDDEN);
				}

				if(myUser.getType() == 1 || accessedUser.getId() == myUser.getId() ){
					return ResponseEntity.ok().body(true);
				} else {
					return new ResponseEntity<String>("Não autorizado", HttpStatus.FORBIDDEN);
				}

			} catch (IllegalArgumentException e) {
				System.out.println("Unable to get JWT Token");
			} catch (ExpiredJwtException e) {
				System.out.println("JWT Token has expired");
			}
		}


		return null;
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<?> findById(@PathVariable int id){
		
		UserDAO a = userDetailsService.findById(id).orElse(null);

		if(a == null){
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok().body(a);
		}
	}


	@PutMapping(value = "users/{id}")
	public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody UserDAO user){

		UserDAO record = userDetailsService.update(id, user);

		if(record == null){
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok().body(record);
	}

	@PostMapping(value = "users")
	public ResponseEntity<?> createUser(@RequestBody UserDAO user){
		UserDAO newUser = userDetailsService.create(user);

		if(newUser.getId() != 0){
			return ResponseEntity.ok().body(newUser.getId());
		}

		return ResponseEntity.badRequest().build();
	}


	@DeleteMapping(value = "users/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable int id) {
		UserDAO user = userDetailsService.findById(id).orElse(null);

		if(user == null){
			return ResponseEntity.notFound().build();
		} else {
			userDetailsService.deleteById(id);

			return ResponseEntity.ok().build();
		}
	}


	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}