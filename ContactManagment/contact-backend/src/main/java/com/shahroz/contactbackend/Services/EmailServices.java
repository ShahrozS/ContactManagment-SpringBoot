package com.shahroz.contactbackend.Services;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.Email;
import com.shahroz.contactbackend.Repository.Emailrepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
public class EmailServices implements EmailServiceInterface{


    @Autowired
    Emailrepository emailrepository;


    public void saveEmail(Email email)
    {
        try{
            emailrepository.save(email);

        }catch (Exception e){
            log.error("{)",e);
        }


    }




    public List<Contact> getContactByEmail(String email){

        List<Contact> contacts = new ArrayList<>();
        Email email1 = emailrepository.findByEmail(email);
        contacts.add(email1.getContact());

        return contacts;

    }

}


