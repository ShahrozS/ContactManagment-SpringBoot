package com.shahroz.contactbackend.Repository;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface Emailrepository extends JpaRepository<Email,Long> {


    public  Email findByEmail(String Email);

}
