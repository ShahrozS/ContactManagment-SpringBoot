package com.shahroz.contactbackend.Controllers;


import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/user")
public class UserController {

    private final  UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/find/all-users")
    ResponseEntity<List<User>> getAllUsers(){
        log.info("Returning all users");
        return ResponseEntity.ok(userService.getUsers());
    }


    @GetMapping("/{id}")
    ResponseEntity<User> getUserById(@PathVariable Long id){

        log.info("Returning user of id : {}",id);
        return ResponseEntity.ok(userService.findById(id));
    }


    @PostMapping("/checkPassword/{password}/{id}")
    ResponseEntity<String> checkPassword(@PathVariable String password, @PathVariable Long id){
        User user = userService.findById(id);

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        boolean check = bCryptPasswordEncoder.matches(password,user.getPassword());
        System.out.println(password +" :::: "+user.getPassword());

        log.info("Checked Password successfully");
        if(check){
            return ResponseEntity.ok("True");
        }else{
            return ResponseEntity.ok("False");
        }
    }

    @PostMapping("/updatePassword/{password}/{id}")
    ResponseEntity<String> updatePassword(@PathVariable String password , @PathVariable Long id){
        System.out.println("Cont Updating this password "+password);
        log.info("Updated password");
        if(userService.updatePassword(id,password)){
            return ResponseEntity.ok("True");
        }else{
            return ResponseEntity.ok("False");
        }
    }

    @GetMapping("/find/{email}")
    ResponseEntity<User> findByEmail(@PathVariable String email){
       log.info("Found Email");
        return ResponseEntity.ok(userService.findByEmail(email));
    }

//    @GetMapping("/current-user")
//    public User getCurrentUser(Principal principal){
//
//        try{
//            return userService.findByEmail(principal.getName());
//        }catch(Exception e){
//            log.error("Exception in controller, save user {}" , e);
//return null;
//        }
//    }




    @GetMapping("/search/{name}")
    ResponseEntity<List<User>> getUserByName(@PathVariable String name){
        System.out.println("In Controller:  "+ name);

        log.info("Searched by name");
        return ResponseEntity.ok(userService.findByName(name));
    }

//    @PostMapping("/save")
//    ResponseEntity<User> saveUser(@RequestBody User user){
//        try{
//
//            User user1 = userService.createUser(user);
//            return ResponseEntity.ok(user1);
//
//        }catch(Exception e){
//            log.error("Exception in controller, save user {}" , e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//
//        }
//    }

//    @Autowired
//    PasswordEncoder passwordEncoder;
    @PutMapping("/updateUser")
    ResponseEntity<User> updateUser(@RequestBody User user){
            try{

                log.info("Updated user");
                return ResponseEntity.ok(userService.updateUser(user.getUser_id(),user));
            }catch(Exception e){
                log.error("Exception in controller, save user {}" , e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
    }

    @GetMapping("/current-user")
    public ResponseEntity<String> currentUser() {

        log.info("Found Current User");
        if (userService.isUserLoggedIn()) {
            return ResponseEntity.ok("Logged in user: " + userService.getCurrentUsername());
        } else {
            return ResponseEntity.ok("False");
        }
    }
}
