package com.shahroz.contactbackend.Repository;

import com.shahroz.contactbackend.Entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Contactrepository extends JpaRepository<Contact,Long> {


}
