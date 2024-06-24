package com.shahroz.contactbackend.Security;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class JwtResponse {

private String jwtToken;
private String username;
}
