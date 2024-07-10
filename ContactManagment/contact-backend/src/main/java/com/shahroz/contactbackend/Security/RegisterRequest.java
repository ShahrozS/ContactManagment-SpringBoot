package com.shahroz.contactbackend.Security;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String address;
    private String email;
    private String password;

}
