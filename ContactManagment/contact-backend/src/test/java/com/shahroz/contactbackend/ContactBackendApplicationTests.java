package com.shahroz.contactbackend;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Repository.Contactrepository;
import com.shahroz.contactbackend.Repository.Userrepository;
import com.shahroz.contactbackend.Services.ContactService;
import com.shahroz.contactbackend.Services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import  static  org.mockito.Mockito.when;

@SpringBootTest
class ContactBackendApplicationTests {

    @Test
    void contextLoads() {
    }


    @Autowired
    private UserService service;

    private ContactService contactService;


    @MockBean
    private Userrepository userrepository;
    private Contactrepository contactrepository;
    public void addFriendContactTest(){

//when(contactService.saveFriendContact(
//        new Contact("1",)
//))
    }

//
//    public void findByFriendAndOwnerTest(){
//        when(contactrepository.findByFriendAndOwner(1l,2l).
//    }

}
