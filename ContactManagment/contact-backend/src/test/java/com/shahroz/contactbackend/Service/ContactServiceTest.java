package com.shahroz.contactbackend.Service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.verify;
import static org.assertj.core.api.Assertions.assertThat;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.Email;
import com.shahroz.contactbackend.Entities.Phone;
import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Repository.Contactrepository;
import com.shahroz.contactbackend.Repository.Userrepository;
import com.shahroz.contactbackend.Services.ContactService;
import com.shahroz.contactbackend.Services.EmailServices;
import com.shahroz.contactbackend.Services.PhoneService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)

class ContactServiceTest {

    @Mock
    private Userrepository userrepo;
    @Mock
    private Contactrepository contactrepo;
    @Mock
    private EmailServices emailServices;
    @Mock
    private PhoneService phoneService;

    @InjectMocks
    private ContactService contactService;

    private User user;
    private Contact contact;


    @BeforeEach
    void setUp() {
        user = new User(45L, "Shahroz@123.com", "1234", "Shahroz", "Salman", "asd", "0321", "-");
        contact = new Contact();
        contact.setTitle("Mr");
        contact.setFirstName("Shahroz");
        contact.setLastName("Salman");
        contact.setOwner(user);
    }

    @Test
    void createContact() {
        // Given
        Email email = new Email(1L, "test@example.com", contact);
        Phone phone = new Phone(1L, "0321", contact);
        contact.setEmails(new HashSet<>(Collections.singletonList(email)));
        contact.setPhones(new HashSet<>(Collections.singletonList(phone)));

        given(contactrepo.save(any(Contact.class))).willAnswer(invocation -> {
            Contact savedContact = invocation.getArgument(0);
            savedContact.setContact_id(20L);
            return savedContact;
        });

        // Log before the method call
        System.out.println("Contact before saving: " + contact);

        // When
        Contact savedContact = contactService.createContact(contact);

        // Then
        assertThat(savedContact).isNotNull();
        assertThat(savedContact.getContact_id()).isEqualTo(20L);
        verify(emailServices).saveEmail(email);
        verify(phoneService).savePhone(phone);
    }

    @Test
    void findContactById() {
        // Given
        given(contactrepo.findById(20L)).willReturn(Optional.of(contact));

        // When
        Contact foundContact = contactService.findContactById(20L);

        // Then
        assertThat(foundContact).isNotNull();
        assertThat(foundContact).isEqualTo(contact);
    }

    @Test
    void findContactsByOwnerId() {
        // Given
        List<Contact> contactList = Arrays.asList(contact);
        given(userrepo.findById(45L)).willReturn(Optional.of(user));
        given(contactrepo.findByOwner(Optional.of(user))).willReturn(contactList);

        // When
        List<Contact> contacts = contactService.findContactsByOwnerId(45L);

        // Then
        assertThat(contacts).isNotNull();
        assertThat(contacts.size()).isEqualTo(1);
        assertThat(contacts.get(0)).isEqualTo(contact);
    }

    @Test
    void deleteContact() {
        // Given
        Email email = new Email(1L, "test@example.com", contact);
        Phone phone = new Phone(1L, "0321", contact);
        contact.setEmails(new HashSet<>(Collections.singletonList(email)));
        contact.setPhones(new HashSet<>(Collections.singletonList(phone)));

        // When
        contactService.deleteContact(contact);

        // Then
        verify(emailServices).deleteEmail(email);
        verify(phoneService).deletePhone(phone);
        verify(contactrepo).delete(contact);
    }


    @Test
    public void findAllContacts() {
        // Given
        Email email = new Email(1L, "test@example.com", contact);
        Phone phone = new Phone(1L, "0321", contact);
        contact.setEmails(new HashSet<>(Collections.singletonList(email)));
        contact.setPhones(new HashSet<>(Collections.singletonList(phone)));

        given(contactrepo.save(any(Contact.class))).willAnswer(invocation -> {
            Contact savedContact = invocation.getArgument(0);
            savedContact.setContact_id(20L);
            return savedContact;
        });

        given(contactrepo.findAll()).willReturn(Collections.singletonList(contact));

        // Log before the method call
        System.out.println("Contact before saving: " + contact);

        // When
        Contact savedContact = contactService.createContact(contact);

        // Then
        assertThat(savedContact).isNotNull();
        assertThat(savedContact.getContact_id()).isEqualTo(20L);
        verify(emailServices).saveEmail(email);
        verify(phoneService).savePhone(phone);

        List<Contact> contacts = contactService.allContacts();

        for (Contact contact1 : contacts) {
            System.out.println("HELLO");
            System.out.println(contact1.toString());
        }

        assertThat(contacts).isNotNull();
        assertThat(contacts.size()).isEqualTo(1);
    }



}
