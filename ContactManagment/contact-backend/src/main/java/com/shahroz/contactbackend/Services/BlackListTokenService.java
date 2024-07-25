package com.shahroz.contactbackend.Services;


import com.shahroz.contactbackend.Entities.BlackListTokens;
import com.shahroz.contactbackend.Repository.BlackListTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BlackListTokenService {
    private final BlackListTokenRepository blackListTokenRepository;


    @Autowired
    public BlackListTokenService(BlackListTokenRepository blackListTokenRepository) {
        this.blackListTokenRepository = blackListTokenRepository;
    }


    public boolean isTokenBlacklisted(String token){
        Optional<BlackListTokens> token1 = blackListTokenRepository.findBlackListTokensByToken(token);
        System.out.println("CHECKING "+token1.toString());
        if(token1.isEmpty()){
            return false;
        }
        else{
            return true;
        }

    }

    public String saveBlackListedToken(String token){
        BlackListTokens tokens = new BlackListTokens();
        tokens.setToken(token);
        blackListTokenRepository.save(tokens);

        return token;
    }


}
