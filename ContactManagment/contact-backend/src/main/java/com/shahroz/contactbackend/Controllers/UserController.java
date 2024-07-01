package com.shahroz.contactbackend.Controllers;


import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    ResponseEntity<User> getUserById(@PathVariable Long id){

        return ResponseEntity.ok(userService.findById(id));
    }
}
