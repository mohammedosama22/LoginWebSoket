package com.qeema.app.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.qeema.app.entity.Users;
import com.qeema.app.repository.UserRepository;
import com.qeema.dto.UserDto;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	public ResponseEntity<?> getUserDetails() {
		try {
			List<Users> usersList = null;
			usersList = userRepository.findAll();
			return new ResponseEntity<>(usersList, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> createUserDetails(Users request) {
		try {
			Users user = new Users();
			user.setUsername(request.getUsername());
			user.setEmail(request.getEmail());
			user.setPassword(request.getPassword());
			user.setIsLogged(false);
			userRepository.save(user);

			return new ResponseEntity<>("Saved Succefuly", HttpStatus.OK);

		}

		catch (DataIntegrityViolationException ex) {
			return new ResponseEntity<>("This  Email Already Esist", HttpStatus.BAD_REQUEST);
		}

		catch (Exception e) {
			return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
		}

	}

	public ResponseEntity<?> verfiyUserNameAndPassword(Users request) {
		    Users user = new Users();
			String token = UUID.randomUUID().toString();
			user = userRepository.getUserByUserName(request.getEmail(), request.getPassword()); 
			
				if (user != null) {
					user.setIsLogged(true);
					user.setToken(token);
					userRepository.save(user);
					
					UserDto dto = new UserDto();
					dto.setEmail(user.getEmail());
					dto.setToken(user.getToken());
				  return new ResponseEntity<>(dto, HttpStatus.OK);
		}
				else {
					  return new ResponseEntity<>("Not Found", HttpStatus.BAD_REQUEST);
				}
	}

	public ResponseEntity<?> logout(String email) {
		try {

			Users user = new Users();
			user = userRepository.getUserByEmail(email);
			user.setIsLogged(false);
			userRepository.save(user);
			return new ResponseEntity<>("User Logout", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<?> getTotalNumberOfUsers() {
		int totalNumberOfLoggedUsers;
		int totalNumberOfUser;
		Map<String, Integer> totalNumber = new HashMap<>();

		try {
			totalNumberOfUser = userRepository.getTotalNumberOfUsers();
			totalNumberOfLoggedUsers = userRepository.getTotalNumberOfLoggedUsers();
			totalNumber.put("totalNumberOfUser", totalNumberOfUser);
			totalNumber.put("totalNumberOfLoggedUsers", totalNumberOfLoggedUsers);
			return new ResponseEntity<>(totalNumber, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
		}
	}

	/*
	 * public ResponseEntity<?> updateUserDetails(Users request) { try { Users user
	 * = new Users(); user.setUserName(request.getUserName());
	 * user.setEmail(request.getEmail()); user.setPassword(request.getPassword());
	 * user.setIsLogged(true); userRepository.save(user);
	 * 
	 * return new ResponseEntity<>("Update Succefuly", HttpStatus.OK);
	 * 
	 * }
	 * 
	 * 
	 * catch (Exception e) { return new ResponseEntity<>("Error",
	 * HttpStatus.BAD_REQUEST); } }
	 * 
	 * 
	 * 
	 * public ResponseEntity<?> deleteUserByUserName(String username) { try {
	 * 
	 * Users u = new Users(); u.setUsername(username);
	 * userRepository.deleteUserByUserName(username);
	 * 
	 * return new ResponseEntity<>("User Deleted", HttpStatus.OK);
	 * 
	 * } catch (Exception e) { return new ResponseEntity<>("Error",
	 * HttpStatus.BAD_REQUEST); } }
	 */

}
