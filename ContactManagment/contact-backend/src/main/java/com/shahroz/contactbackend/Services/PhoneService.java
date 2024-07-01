package com.shahroz.contactbackend.Services;

import com.shahroz.contactbackend.Entities.Phone;
import com.shahroz.contactbackend.Repository.Phonerepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Service;


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
            log.error("{)",e);
        }
    }


}
