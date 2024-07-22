package com.shahroz.contactbackend.Repository;

import com.shahroz.contactbackend.Entities.BlackListTokens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;


@Repository
public interface BlackListTokenRepository extends JpaRepository<BlackListTokens,Long > {


 public Optional<BlackListTokens> findBlackListTokensByToken(String token);

}
