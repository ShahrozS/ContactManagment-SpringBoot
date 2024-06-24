package com.shahroz.contactbackend.Security;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class JwtRequest {


    private String email;
    private String password;

}
