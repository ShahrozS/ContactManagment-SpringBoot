package com.shahroz.contactbackend.Service;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.Phone;
import com.shahroz.contactbackend.Repository.Phonerepository;
import com.shahroz.contactbackend.Services.PhoneService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class PhoneServiceTest {

    @Mock
    private Phonerepository phonerepository;

    @InjectMocks
    private PhoneService phoneService;

    @Test
    void savePhone() {
        // given
        Phone phone = new Phone(1L, "0123456789", new Contact());

        // when
        given(phonerepository.save(phone)).willReturn(phone);
        phoneService.savePhone(phone);

        // then
        verify(phonerepository, times(1)).save(phone);
    }

    @Test
    void findContactByPhoneNumber() {
        // given
        String phoneNumber = "0123456789";
        Contact contact = new Contact();
        Phone phone = new Phone(1L, phoneNumber, contact);
        List<Phone> phoneList = new ArrayList<>();
        phoneList.add(phone);

        // when
        given(phonerepository.findByPhoneNumber(phoneNumber)).willReturn(phoneList);
        List<Contact> contacts = phoneService.findContactByPhoneNumber(phoneNumber);

        // then
        assertThat(contacts).isNotNull();
        assertThat(contacts.size()).isEqualTo(1);
        assertThat(contacts.get(0)).isEqualTo(contact);
    }

    @Test
    void deletePhone() {
        // given
        Phone phone = new Phone(1L, "0123456789", new Contact());

        // when
        doNothing().when(phonerepository).delete(phone);
        phoneService.deletePhone(phone);

        // then
        verify(phonerepository, times(1)).delete(phone);
    }
}
