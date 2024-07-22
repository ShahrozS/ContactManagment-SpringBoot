package com.shahroz.contactbackend.Security2;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginResponse {
    private String token;
    private String username;
    private long expiresIn;

    public String getToken() {
        return token;
    }

    // Getters and setters...
}