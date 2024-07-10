package com.shahroz.contactbackend.Controllers;


import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    ResponseEntity<User> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal){

        try{
            return userService.findByEmail(principal.getName());
        }catch(Exception e){
            log.error("Exception in controller, save user {}" , e);
return null;
        }
    }




    @GetMapping("/search/{name}")
    ResponseEntity<List<User>> getUserByName(@PathVariable String name){
        System.out.println("In Controller:  "+ name);
        return ResponseEntity.ok(userService.findByName(name));
    }

    @PostMapping("/save")
    ResponseEntity<User> saveUser(@RequestBody User user){
        try{

            User user1 = userService.createUser(user);
            return ResponseEntity.ok(user1);

        }catch(Exception e){
            log.error("Exception in controller, save user {}" , e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }
}
