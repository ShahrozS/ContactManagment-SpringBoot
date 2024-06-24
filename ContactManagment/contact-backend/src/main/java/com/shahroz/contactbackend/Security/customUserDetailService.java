package com.shahroz.contactbackend.Security;

import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Repository.Userrepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class customUserDetailService implements UserDetailsService {
  @Autowired
  private Userrepository userrepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        //Loading User From Database

            User user = userrepository.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException("User not found with email: " + username));


        return user;
    }
}
