package com.shahroz.contactbackend.Security;

import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Repository.Userrepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final Userrepository userrepository;
private final PasswordEncoder passwordEncoder;
private final JwtHelper jwtService;
private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder().firstName(request.getFirst_name())
                .lastName(request.getLast_name())
                .address(request.getAddress())
                .phoneNumber(request.getPhonenumber())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userrepository.save(user);
        var jwtToken=jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();




    }
    public AuthenticationResponse authenticate(AuthenticationRequest request){

authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        )
);

var user = userrepository.findByEmail(request.getEmail())
        .orElseThrow();
        var jwtToken=jwtService.generateToken(user);

        return AuthenticationResponse.builder().token(jwtToken).build();

    }
}
