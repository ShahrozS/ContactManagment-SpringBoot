package com.shahroz.contactbackend.Repository;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Contactrepository extends JpaRepository<Contact,Long> {

    List<Contact> findByOwner(Optional<User> owner);
    Optional<Contact> findByFriend(Optional<User> friend);

    List<Contact> findByFirstName(String firstname);
    List<Contact> findByLastName(String lastname);

    @Query("SELECT c FROM Contact c WHERE  c.owner.user_id = :ownerId AND c.friend.user_id = :friendId")
    Optional<Contact> findByFriendAndOwner(@Param("ownerId") Long ownerId, @Param("friendId") Long friendId);


}
