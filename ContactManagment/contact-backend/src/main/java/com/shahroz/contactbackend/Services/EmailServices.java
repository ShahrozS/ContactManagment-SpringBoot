package com.shahroz.contactbackend.Services;

import com.shahroz.contactbackend.Entities.Email;
import com.shahroz.contactbackend.Repository.Emailrepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class EmailServices implements EmailServiceInterface{


    @Autowired
    Emailrepository emailrepository;


    public void saveEmail(Email email)
    {
        try{
            emailrepository.save(email);

        }catch (Exception e){
            log.error("{)",e);
        }


    }




}


