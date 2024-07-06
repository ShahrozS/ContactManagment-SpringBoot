package com.shahroz.contactbackend.Repository;

import com.shahroz.contactbackend.Entities.Phone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface Phonerepository extends JpaRepository<Phone,Long> {

    public Phone findByPhoneNumber(String phone);

}
