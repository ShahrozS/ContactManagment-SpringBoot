package com.shahroz.contactbackend.Controllers;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.Email;
import com.shahroz.contactbackend.Services.ContactService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class ContactControllerTest {

    @Mock
    private ContactService contactService;

    @InjectMocks
    private ContactController contactController;

    private Contact contact;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        contact = new Contact();
        contact.setContact_id(1L);
        contact.setFirstName("John");
        contact.setLastName("Doe");
        contact.setTitle("Friend");
    }


    @Test
    void getContactsById() {
        List<Contact> contacts = Arrays.asList(contact);
        when(contactService.findContactsByOwnerId(anyLong())).thenReturn(contacts);

        ResponseEntity<List<Contact>> response = contactController.getContactsById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contacts, response.getBody());
    }

    @Test
    void searchContact() {
        List<Contact> contacts = Arrays.asList(contact);
        when(contactService.searchContact(anyString(), anyLong())).thenReturn(contacts);

        ResponseEntity<List<Contact>> response = contactController.searchContact("John", 1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contacts, response.getBody());
    }

    @Test
    void addFriendContact() {
        when(contactService.saveFriendContact(any(Contact.class))).thenReturn(contact);

        ResponseEntity<Contact> response = contactController.addFriendContact(contact);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contact, response.getBody());
    }

    @Test
    void findByOwnerAndFriend() {
        when(contactService.findByFriendAndOwner(anyLong(), anyLong())).thenReturn(Optional.of(contact));

        Map<String, Long> body = new HashMap<>();
        body.put("owner_id", 1L);
        body.put("friend_id", 2L);

        ResponseEntity<Optional<Contact>> response = contactController.findByOwnerAndFriend(body);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(Optional.of(contact), response.getBody());
    }

    @Test
    void updateContact() {
        when(contactService.updateContact(anyLong(), any(Contact.class))).thenReturn(contact);

        ResponseEntity<Contact> response = contactController.updateContact(contact);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contact, response.getBody());
    }

    @Test
    void deleteContact() {
        doNothing().when(contactService).deleteContact(any(Contact.class));

        ResponseEntity<String> response = contactController.deleteContact(contact);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Deleted succesfully", response.getBody());
    }

    @Test
    void sortByFirstNameAsc() {
        List<Contact> contacts = Arrays.asList(contact);
        when(contactService.sortByFirstNameAsc(anyLong())).thenReturn(contacts);

        ResponseEntity<List<Contact>> response = contactController.sortByFirstNameAsc(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contacts, response.getBody());
    }

    @Test
    void sortByLastNameAsc() {
        List<Contact> contacts = Arrays.asList(contact);
        when(contactService.sortByLastNameAsc(anyLong())).thenReturn(contacts);

        ResponseEntity<List<Contact>> response = contactController.sortByLastNameAsc(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contacts, response.getBody());
    }

    @Test
    void sortByTitleAsc() {
        List<Contact> contacts = Arrays.asList(contact);
        when(contactService.sortByTitleAsc(anyLong())).thenReturn(contacts);

        ResponseEntity<List<Contact>> response = contactController.sortByTitleAsc(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contacts, response.getBody());
    }

    @Test
    void sortByFirstNameDesc() {
        List<Contact> contacts = Arrays.asList(contact);
        when(contactService.sortByFirstNameDesc(anyLong())).thenReturn(contacts);

        ResponseEntity<List<Contact>> response = contactController.sortByFirstNameDesc(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contacts, response.getBody());
    }

    @Test
    void sortByLastNameDesc() {
        List<Contact> contacts = Arrays.asList(contact);
        when(contactService.sortByLastNameDesc(anyLong())).thenReturn(contacts);

        ResponseEntity<List<Contact>> response = contactController.sortByLastNameDesc(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contacts, response.getBody());
    }

    @Test
    void sortByTitleDesc() {
        List<Contact> contacts = Arrays.asList(contact);
        when(contactService.sortByTitleDesc(anyLong())).thenReturn(contacts);

        ResponseEntity<List<Contact>> response = contactController.sortByTitleDesc(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contacts, response.getBody());
    }
}
