package com.shahroz.contactbackend.Repository;

import com.shahroz.contactbackend.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;


@Repository
public interface Userrepository extends JpaRepository<User,Long> {
    @Query("Select u.user_id from User u where u.email = :email")
    public Long findIdByEmail(@Param("email") String email);

    public Optional<User> findByEmail(String email);
    public Optional<User> findByAddress(String address);

    public List<User> findByFirstName(String firstNname);

    public List<User> findByLastName(String lastName);

    public Optional<User> findByPhoneNumber(String phoneNumber);

    public List<User> findByFirstNameAndLastName(String firstname, String lastname);

    @Modifying
    @Query("Delete from User u where u.user_id = :id ")
    public void deleteByID(Long id);

}