package com.shahroz.contactbackend.Services;

import com.shahroz.contactbackend.Entities.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import com.shahroz.contactbackend.Repository.Userrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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
        System.out.println(user.getPassword());
        return userrepository.save(user);
    }


    @Override
    public User findById(Long id) {
        try {
            return userrepository.findById(id).orElse(null);
        }catch(Exception e){
            log.error("User not found? {}",e);
            return null;

        }
        }



    @Override
    public User updateUser(Long id, User user) {


        User existinguser = userrepository.findById(id).orElseThrow(()->new RuntimeException("Entity not found"));
        existinguser.setPhoneNumber(user.getPhoneNumber());
        existinguser.setFirstName(user.getFirstName());
        existinguser.setLastName(user.getLastName());
        existinguser.setAddress(user.getAddress());
         existinguser.setEmail(user.getEmail());
         existinguser.setPassword(user.getPassword());


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

    @Override
    public List<User> findByFirstName(String firstname) {

        try{
                     return userrepository.findByFirstName(firstname);
        }catch(Exception e){

            log.error("{}",e);
            return null;
        }
    }

    @Override
    public List<User> findByLastName(String lastname) {

        try{
            return userrepository.findByLastName(lastname);
        }catch(Exception e){
            log.error("{}",e);
            return null;
        }
    }


    public List<User> findByName(String name){
        try{
            System.out.println("In Controller:  "+ name);

            Pattern pattern = Pattern.compile("^[a-zA-Z]+\\s[a-zA-Z]+$");
            Matcher matcher = pattern.matcher(name);
            List<User> users = new ArrayList<>();

            if (matcher.matches()) {
                String[] parts = name.split(" ");
                String firstName = parts[0];
                String lastName = parts[1];

                users = findByFullName(firstName,lastName);
            } else {
                users = findByFirstName(name);
                if (users == null || users.isEmpty()) {
                    System.out.println("Searching by last name: " + name);
                    users = findByLastName(name);
                } else {
                    System.out.println("Searching by first name: " + name);
                }
            }

            if (users == null || users.isEmpty()) {
                System.out.println("No users found for name: " + name);
                return null;
            }
            return users;
        }catch(Exception e){
            log.error("{}",e);
            return null;
        }
    }

     public List<User> findByFullName(String firstname, String lastname){

         try{
             return userrepository.findByFirstNameAndLastName(firstname,lastname);
         }catch(Exception e){
             log.error("{}",e);
             return null;
         }
     }
     public boolean updatePassword(Long userid,String password){
         try{
             User user = findById(userid);

               user.setPassword(passwordEncoder.encode(password));
             User user1 = updateUser(userid, user);
             if(user1==null){
                 return false;
             }else{
                 return true;
             }
         } catch (Exception e){
             log.error("in udpatePassword {}",e);
            return false;
         }
     }


    public static boolean isUserLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Authentication: " + authentication);
        return authentication != null && authentication.isAuthenticated() &&
                !(authentication.getPrincipal() instanceof String && authentication.getPrincipal().equals("anonymousUser"));
    }

    public static String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            System.out.println("Principal: " + principal);
            if (principal instanceof UserDetails) {
                return ((UserDetails) principal).getUsername();
            } else {
                return principal.toString();
            }
        }
        return null;
    }


    public User getUserFromPhoneNumber(String phonenumber){
        return userrepository.findByPhoneNumber(phonenumber).get();
    }

}
