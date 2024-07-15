package com.shahroz.contactbackend;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Repository.Contactrepository;
import com.shahroz.contactbackend.Services.ContactService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ContactRepositoryTest {

    @Mock
    private Contactrepository contactRepository;

    @InjectMocks
    private ContactService contactService; // Assuming you have a ContactService that uses Contactrepository

    @Test
    public void findByFriendAndOwnerTest() {
        Long ownerId = 1L;
        Long friendId = 2L;

        User owner = new User();
        owner.setUser_id(ownerId);

        User friend = new User();
        friend.setUser_id(friendId);

        Contact contact = new Contact();
        contact.setOwner(owner);
        contact.setFriend(friend);

        when(contactRepository.findByFriendAndOwner(friendId, ownerId)).thenReturn(Optional.of(contact));

        Optional<Contact> contactOptional = contactService.findByFriendAndOwner(friendId, ownerId); // Replace with actual method call from your service layer

        assertThat(contactOptional).isPresent();
        Contact retrievedContact = contactOptional.get();
        assertThat(retrievedContact.getOwner().getUser_id()).isEqualTo(ownerId);
        assertThat(retrievedContact.getFriend().getUser_id()).isEqualTo(friendId);

        verify(contactRepository, times(1)).findByFriendAndOwner(friendId, ownerId);
    }
}
