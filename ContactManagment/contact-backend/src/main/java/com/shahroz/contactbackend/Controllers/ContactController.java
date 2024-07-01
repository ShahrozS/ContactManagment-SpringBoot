package com.shahroz.contactbackend.Controllers;


import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Services.ContactService;
import com.shahroz.contactbackend.Services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contacts")
@Slf4j
public class ContactController {


//    try{
//
//    }catch(Exception e){
//        log.error("In Controller: {}",e);
//    }


    @Autowired
    UserService userService;

    @Autowired
    ContactService contactService;

    @PostMapping
    public ResponseEntity<String> createContact(@RequestBody Contact contact){

        System.out.println("----------> Contact "+ contact.getFirstName());
    try{


        contactService.createContact(contact);
        return ResponseEntity.ok("saved");
    }catch (Exception e){
        log.error("In Controller: {}",e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error creating contact: " + e.getMessage());
    }
    }

}
