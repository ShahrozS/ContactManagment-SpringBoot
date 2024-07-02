package com.shahroz.contactbackend.Services;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.Email;
import com.shahroz.contactbackend.Entities.Phone;
import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Repository.Contactrepository;
import com.shahroz.contactbackend.Repository.Userrepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ContactService implements ContactServiceInterface{

    @Autowired
    Userrepository userrepo;

    @Autowired
    Contactrepository contactrepo;



    @Override
    public void createContact(Contact contact) {
        try{
            System.out.println(contact.toString());

            if(contact.getEmails()!=null){
                for(Email email:contact.getEmails()){
                    email.setContact(contact);
                }
            }

            if(contact.getPhones()!=null){

                for(Phone phone:contact.getPhones()){
                    phone.setContact(contact);
                }
            }

            contactrepo.save(contact);
        }catch(Exception e){
            log.error("{}",e);
        }

    }

    @Override
    public List<Contact> allContacts() {
        try {
            List<Contact> contacts = contactrepo.findAll();
            return contacts;
        }
        catch (Exception e){
            log.error("{}",e);
        }
        return null;
    }

    @Override
    public Contact findContactById(Long id) {

       try{
           Contact contact = contactrepo.findById(id).orElse(null);
           return contact;

       }catch (Exception e){
           log.error("{}",e);
       }

        return null;
    }

    @Override
    public List<Contact> findContactsByOwnerId(Long ownerid) {

        Optional<User> user = userrepo.findById(ownerid);
       return contactrepo.findByOwner(user);

    }

    @Override
    public Optional<Contact> findContactByFriendId(Long friendid) {
    try{

        Optional<User> friend  = userrepo.findById(friendid);
        Optional<Contact> contact  = contactrepo.findByFriend(friend);
        return contact;

    }
        catch (Exception e){
        log.error("{}",e);
    }



        return Optional.empty();
    }

    @Override
    public List<Optional<Contact>> findContactByFriendFirstName(String firstname) {
        try{


            List<User> users = userrepo.findByFirstName(firstname);

            List<Optional<Contact>> contacts = new ArrayList<>();


            for (  User user : users) {
                Optional<Contact> contact = contactrepo.findByFriend(Optional.ofNullable(user));
                contacts.add(contact);

            }
            return contacts;
        }
        catch (Exception e){
            log.error("{}",e);
        }

        return null;
    }

    @Override
    public List<Optional<Contact>> findContactByFriendLastName(String lastname) {

        try{


            List<User> users = userrepo.findByLastName(lastname);

            List<Optional<Contact>> contacts = new ArrayList<>();


            for (  User user : users) {
                Optional<Contact> contact = contactrepo.findByFriend(Optional.ofNullable(user));
                contacts.add(contact);

            }
            return contacts;
        }
        catch (Exception e){
            log.error("{}",e);
        }

        return null;
    }

    @Override
    public List<Optional<Contact>> findContactByFriendName(String firstname, String lastname) {
    try{


        List<User> users = userrepo.findByFirstName(firstname);

        List<Optional<Contact>> contacts = new ArrayList<>();


        for (  User user : users) {
            Optional<Contact> contact = contactrepo.findByFriend(Optional.ofNullable(user));
            contacts.add(contact);

        }
        return contacts;
    }
        catch (Exception e){
        log.error("{}",e);
    }

        return null;
    }

    @Override
    public Optional<Contact> findContactByPhoneNumber(String phonenumber) {
        //    try{
//
//    }
//        catch (Exception e){
//        log.error("{}",e);
//    }

        return Optional.empty();
    }
//    try{
//
//    }
//        catch (Exception e){
//        log.error("{}",e);
//    }

    @Override
    public List<Contact> findContactByOwnerId(Long ownerid) {
        try{
            Optional<User> owner = userrepo.findById(ownerid);
            List<Contact> contacts = contactrepo.findByOwner(owner);
            return contacts;
        }
        catch (Exception e){
            log.error("{}",e);
        }
        return null;
    }

    @Override
    public void deleteContact(Long id) {

    }

    @Override
    public void updateContact(Long id) {

    }
}
