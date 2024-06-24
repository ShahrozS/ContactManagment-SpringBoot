package com.shahroz.contactbackend.Services;

import com.shahroz.contactbackend.Entities.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import com.shahroz.contactbackend.Repository.Userrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService implements UserServiceInterface{


    @Autowired
    private Userrepository userrepository;

    @Autowired
    PasswordEncoder passwordEncoder;



    public List<User> getUsers(){
return userrepository.findAll();
    }

    public User createUser(User user){
user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userrepository.save(user);
    }


    @Override
    public User findById(Long id) {
        return userrepository.findById(id).orElse(null);
    }



    @Override
    public User updateUser(Long id, User user) {


        User existinguser = userrepository.findById(id).orElseThrow(()->new RuntimeException("Entity not found"));
        existinguser.setPhone_number(user.getPhone_number());


        existinguser.setFirst_name(user.getFirst_name());

        existinguser.setLast_name(user.getLast_name());

        existinguser.setAddress(user.getAddress());

         existinguser.setEmail(user.getEmail());

         return userrepository.save(existinguser);



    }
    private static final int MAX_RETRY_COUNT = 3;

    @Transactional
    @Override
    public Optional<User> deleteUser(Long id) {
        int retryCount = 0;

        while (retryCount < MAX_RETRY_COUNT) {
            try {
                System.out.println(("Entered the try and deleting."));
                Optional<User> user = userrepository.findById(id);
                userrepository.deleteByID(id);
                return user;
            } catch (ObjectOptimisticLockingFailureException ex) {

                retryCount++;

            }
        }


        log.error("Cant delete the user.");
        throw new RuntimeException("Failed to delete user after multiple retries.");
    }



    @Override
    public User findByEmail(String email) {
        System.out.println("EMAILL in service " + email);
        return findById(userrepository.findIdByEmail(email));
    }
}
