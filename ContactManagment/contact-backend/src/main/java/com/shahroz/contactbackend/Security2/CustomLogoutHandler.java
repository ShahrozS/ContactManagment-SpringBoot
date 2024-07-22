package com.shahroz.contactbackend.Security2;

import com.shahroz.contactbackend.Services.BlackListTokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;

@Component
public class CustomLogoutHandler implements LogoutHandler {

    @Autowired
    BlackListTokenService blackListTokenService;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String token = request.getHeader("Authorization");
        System.out.println("CustomLogoutHandler invoked");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            // Add the token to the blacklist
            System.out.println("Adding token to blacklist: " + token);

            blackListTokenService.saveBlackListedToken(token);
        }
        if (authentication != null) {
            System.out.println("Logged out user: " + authentication.getName());
        } else {
            System.out.println("Authentication object is null");
        }
        response.setStatus(HttpServletResponse.SC_OK);
    }

    public boolean isTokenBlacklisted(String token) {
        return blackListTokenService.isTokenBlacklisted(token);
    }
}
