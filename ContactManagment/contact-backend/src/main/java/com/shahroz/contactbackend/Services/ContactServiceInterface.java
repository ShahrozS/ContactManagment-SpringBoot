package com.shahroz.contactbackend.Services;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.User;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface ContactServiceInterface {

    public Contact createContact(Contact contact);
    public List<Contact> allContacts();
    public Contact findContactById(Long id);

    public List<Contact> findContactsByOwnerId(Long ownerid);

    public Optional<Contact> findContactByFriendId(Long friendid);

    public List<Optional<Contact>> findContactByFriendFirstName(String firstname);
    public List<Optional<Contact>> findContactByFriendLastName(String lastname);

    public List<Optional<Contact>> findContactByFriendName(String firstname,String lastname);

    public Optional<Contact> findContactByPhoneNumber(String phonenumber);


    List<Contact> findContactByOwnerId(Long ownerid);

    public void deleteContact(Long id);
    public Contact updateContact(Long contactId,Contact contact);



}
