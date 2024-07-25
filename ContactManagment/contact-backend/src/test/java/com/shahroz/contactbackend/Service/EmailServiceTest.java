package com.shahroz.contactbackend.Service;

import com.shahroz.contactbackend.Entities.Email;
import com.shahroz.contactbackend.Repository.Emailrepository;
import com.shahroz.contactbackend.Services.EmailServices;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class EmailServiceTest {

    @Mock
    private Emailrepository emailrepository;

    @InjectMocks
    private EmailServices emailService;

    @Test
    void saveEmail() {
        // given
        Email email = new Email(1L, "test@example.com");

        // when
        given(emailrepository.save(email)).willReturn(email);
        emailService.saveEmail(email);

        // then
        verify(emailrepository, times(1)).save(email);
    }

    @Test
    void deleteEmail() {
        // given
        Email email = new Email(1L, "test@example.com");

        // when
        doNothing().when(emailrepository).delete(email);
        emailService.deleteEmail(email);

        // then
        verify(emailrepository, times(1)).delete(email);
    }

//    @Test
//    void getContactByEmail() {
//        // given
//        String emailStr = "test@example.com";
//        Contact contact = new Contact();
//        User user = new User(45L, "Shahroz@123.com", "1234", "Shahroz", "Salman", "asd", "0321", "-");
//        contact.setOwner(user);
//        contact.setTitle("Mr");
//        contact.setFirstName("Shahroz");
//        contact.setLastName("Salman");
//        contact.setContact_id(20L);
//
//        Email email = new Email(22L, emailStr, contact);
//        List<Email> emailList = new ArrayList<>();
//        emailList.add(email);
//
//        // when
//        given(emailrepository.findByEmail(emailStr)).willReturn(emailList);
//        List<Contact> contacts = emailService.getContactByEmail(emailStr);
//
//        // then
//        assertThat(contacts).isNotNull();
//        assertThat(contacts.size()).isEqualTo(1);
//        assertThat(contacts.get(0)).isEqualTo(contact);
//    }

}
