package com.shahroz.contactbackend.Security2;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class LoginUserDto {
    private String username;

    private String password;

    // getters and setters here...
}