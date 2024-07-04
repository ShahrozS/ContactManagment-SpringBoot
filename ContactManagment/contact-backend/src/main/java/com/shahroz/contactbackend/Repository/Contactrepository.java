package com.shahroz.contactbackend.Repository;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Contactrepository extends JpaRepository<Contact,Long> {

    List<Contact> findByOwner(Optional<User> owner);
    Optional<Contact> findByFriend(Optional<User> friend);

    List<Contact> findByFirstName(String firstname);
    List<Contact> findByLastName(String lastname);


}
