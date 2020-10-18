package com.qeema.app.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import com.qeema.app.entity.Users;
import com.qeema.app.service.UserService;
import com.qeema.app.soket.Output;

@CrossOrigin
@RestController
@RequestMapping()
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/soket")
    @SendTo("/topic/getUsers")
    public Output output(String name) throws Exception {
        return new Output("Welcome" + HtmlUtils.htmlEscape(name + "!"));
    }



    @PostMapping(path = "register", produces = "application/json")
    public ResponseEntity<?> createUserDetails(@RequestBody Users repuest) {
        try {

             userService.createUserDetails(repuest); 
           this.template.convertAndSend("/topic/getUsers", userService.getTotalNumberOfUsers());
            return new ResponseEntity<>(repuest, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping(path = "login", produces = "application/json")
    public ResponseEntity<?> verfiyUserNameAndPassword(@RequestBody Users request) {
        try {

        	ResponseEntity<?> user = userService.verfiyUserNameAndPassword(request);
             if (user != null)
             {
            this.template.convertAndSend("/topic/getUsers", userService.getTotalNumberOfUsers());
             }
             return user;
        } catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping(path = "logout", produces = "application/json")
    public ResponseEntity<?> logout(@RequestParam("email") String email) {
        try {

        	ResponseEntity<?> user = userService.logout(email);
           if (user != null)
           {
          this.template.convertAndSend("/topic/getUsers", userService.getTotalNumberOfUsers());
        }
           return new ResponseEntity<>(user, HttpStatus.OK);}
       catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping(path = "getTotalNumberOfUsers", produces = "application/json")
    public ResponseEntity<?> getTotalNumberOfUsers() {
        try {

            userService.getTotalNumberOfUsers();
            this.template.convertAndSend("/topic/getUsers", userService.getTotalNumberOfUsers());

        } catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(userService.getTotalNumberOfUsers().getBody(), HttpStatus.OK);

    }



    @GetMapping(path = "getUserDetails", produces = "application/json")
    public ResponseEntity<?> getUserDetails() {
        try {
            userService.getUserDetails();

        } catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(userService.getUserDetails().getBody(), HttpStatus.OK);

    }
    
    /*
     * @PostMapping(path = "updateUserDetails", produces = "application/json")
     * public ResponseEntity<?> updateUserDetails(@RequestBody Users repuest) { try
     * {
     *
     * return userService.updateUserDetails(repuest); }
     *
     * catch (Exception e) { return new ResponseEntity<>("Error",
     * HttpStatus.BAD_REQUEST); }
     *
     * }
     *
     *
     * @GetMapping(path = "deleteUserByUserName", produces = "application/json")
     * public ResponseEntity<?> deleteUserByUserName(@RequestParam("username")
     * String username) { try {
     *
     * return userService.deleteUserByUserName(username); }
     *
     * catch (Exception e) { return new ResponseEntity<>("Error",
     * HttpStatus.BAD_REQUEST); }
     *
     * }
     */

}
