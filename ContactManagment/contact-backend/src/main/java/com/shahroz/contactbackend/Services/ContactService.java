package com.shahroz.contactbackend.Services;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.Email;
import com.shahroz.contactbackend.Entities.Phone;
import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Repository.Contactrepository;
import com.shahroz.contactbackend.Repository.Userrepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ContactService implements ContactServiceInterface{

    @Autowired
    Userrepository userrepo;

    @Autowired
    Contactrepository contactrepo;


    @Autowired
    EmailServices emailServices;


    @Autowired
    PhoneService phoneService;

    @Override
    public Contact createContact(Contact contact) {
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

            Contact contact1 = contactrepo.save(contact);
            return contact1;
        }catch(Exception e){
            log.error("createContact{}",e);
            return  null;
        }

    }

    @Override
    public List<Contact> allContacts() {
        try {
            List<Contact> contacts = contactrepo.findAll();
            return contacts;
        }
        catch (Exception e){
            log.error("allContacts{}",e);
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
    public Contact updateContact(Long contactId, Contact updatedContact) {
        try {
            // Fetch the existing contact from the database
            Contact existingContact = contactrepo.findById(contactId)
                    .orElseThrow(() -> new EntityNotFoundException("Contact not found with id: " + contactId));

            // Update fields of the existing contact with the new values
            existingContact.setTitle(updatedContact.getTitle());
            existingContact.setFirstName(updatedContact.getFirstName());
            existingContact.setLastName(updatedContact.getLastName());

            // Update emails
            updateEmails(existingContact, updatedContact.getEmails());

            // Update phones
            updatePhones(existingContact, updatedContact.getPhones());

            // Save the updated contact
            return contactrepo.save(existingContact);
        } catch (Exception e) {
            log.error("Error updating contact with id {}: {}", contactId, e.getMessage());
            throw e; // You might want to handle or wrap this exception appropriately
        }
    }

    private void updateEmails(Contact contact, Set<Email> updatedEmails) {
        // Clear existing emails
        contact.getEmails().clear();

        // Update or add new emails
        if (updatedEmails != null) {
            for (Email updatedEmail : updatedEmails) {
                updatedEmail.setContact(contact); // Set the reference to the updated contact
                contact.getEmails().add(updatedEmail);
            }
        }
    }

    private void updatePhones(Contact contact, Set<Phone> updatedPhones) {
        // Clear existing phones
        contact.getPhones().clear();

        // Update or add new phones
        if (updatedPhones != null) {
            for (Phone updatedPhone : updatedPhones) {
                updatedPhone.setContact(contact); // Set the reference to the updated contact
                contact.getPhones().add(updatedPhone);
            }
        }
    }

    public List<Contact> searchContact(String query, Long ownerId){
        List<Contact> contact = new ArrayList<>();
        contact = contactrepo.findByFirstName(query);
        if(contact.isEmpty()){
            contact = contactrepo.findByLastName(query);
            if(contact.isEmpty()){
                contact = phoneService.findContactByPhoneNumber(query);
                if(contact.isEmpty()){
                    contact = emailServices.getContactByEmail(query);
                }
            }
        }

        contact = contact.stream()
                .filter(con -> con.getOwner().getUser_id().equals(ownerId))
                .collect(Collectors.toList());

        return contact;
    }


    public Contact saveFriendContact(Contact contact){
        try {
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
            System.out.println("in service  + " + contact.toString());
            return contact;
        }
        catch (Exception e){
            log.error("Exception in save friend contact service {}",e);
            return null;
        }
    }



    public Optional<Contact> findByFriendAndOwner(Long ownerid , Long friendid){
        return contactrepo.findByFriendAndOwner(ownerid,friendid);
    }
}
