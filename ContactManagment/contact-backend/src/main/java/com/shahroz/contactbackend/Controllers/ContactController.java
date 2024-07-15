package com.shahroz.contactbackend.Controllers;


import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Services.ContactService;
import com.shahroz.contactbackend.Services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    try{
        contactService.createContact(contact);
        return ResponseEntity.ok("saved");
    }catch (Exception e){
        log.error("In Controller: {}",e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error creating contact: " + e.getMessage());
    }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Contact>> getContactsById(@PathVariable Long id){
        try{
            System.out.println("Generating for id: " + id);
            List<Contact> contacts = contactService.findContactsByOwnerId(id);
            System.out.println(contacts.toArray());
                return ResponseEntity.ok(contacts);
        }catch (Exception e){
            log.error("Error fetching contacts for id {}: {}", id, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }

    @GetMapping("/search/{query}/{id}")
    public ResponseEntity<List<Contact>> searchContact(@PathVariable String query,@PathVariable Long id){
        try{
            List<Contact> contacts = contactService.searchContact(query,id);
            System.out.println(contacts.toArray());
            return ResponseEntity.ok(contacts);
        }catch (Exception e){
            log.error("Error fetching contacts for id {}: {}", query, e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }



    @PostMapping("/addFriend")
    public ResponseEntity<Contact> addFriendContact(@RequestBody Contact contact){
    try{
        System.out.println(contact.toString());
        return ResponseEntity.ok(contactService.saveFriendContact(contact));


    }catch (Exception e){
        log.error("Error adding friend contacts for id {}: {}", contact, e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

    }
    }


    @PostMapping("/findByOwnerAndFriend")
    public ResponseEntity<Optional<Contact>> findByOwnerAndFriend(@RequestBody Map<String, Long> body) {
        Long ownerId = body.get("owner_id");
        Long friendId = body.get("friend_id");
        Optional<Contact> contact = contactService.findByFriendAndOwner(ownerId, friendId);
        return ResponseEntity.ok(contact);
    }


}
