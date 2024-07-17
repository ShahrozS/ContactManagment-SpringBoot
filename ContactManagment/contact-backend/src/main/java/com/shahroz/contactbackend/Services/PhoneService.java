package com.shahroz.contactbackend.Services;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.Email;
import com.shahroz.contactbackend.Entities.Phone;
import com.shahroz.contactbackend.Repository.Phonerepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Slf4j
public class PhoneService implements PhoneServiceInterface
{

    @Autowired
    Phonerepository phonerepository;

    void savePhone(Phone phone){
        try{
            phonerepository.save(phone);

        }catch (Exception e){
            log.error("{}",e);
        }
    }

    public List<Contact> findContactByPhoneNumber(String PhoneNumber){

        List<Contact> contacts = new ArrayList<>();
        List<Phone> phone = phonerepository.findByPhoneNumber(PhoneNumber);
        if(phone!=null)
        {
            for(Phone phone2:phone){
                contacts.add(phone2.getContact());
            }
        }


        return  contacts;
    }

    public void deletePhone(Phone phone){
        phonerepository.delete(phone);
    }


}
