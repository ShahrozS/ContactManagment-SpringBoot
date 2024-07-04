package com.shahroz.contactbackend.Services;

import com.shahroz.contactbackend.Entities.User;

import java.util.List;
import java.util.Optional;
public interface UserServiceInterface {

    public User createUser(User user);
    public User findById(Long id);
    List<User> getUsers();
    User updateUser(Long id, User user);
    Optional<User> deleteUser(Long id);

    User findByEmail(String email);

    List<User> findByFullName(String firstname, String lastname);


    public List<User> findByFirstName(String firstname);
    public List<User> findByLastName(String lastname);


}
