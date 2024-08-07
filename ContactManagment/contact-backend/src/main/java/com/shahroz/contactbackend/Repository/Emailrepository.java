package com.shahroz.contactbackend.Repository;

import com.shahroz.contactbackend.Entities.Contact;
import com.shahroz.contactbackend.Entities.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface Emailrepository extends JpaRepository<Email,Long> {


    public List<Email> findByEmail(String Email);
}
