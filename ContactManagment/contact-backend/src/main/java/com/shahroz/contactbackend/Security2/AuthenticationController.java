package com.shahroz.contactbackend.Security2;

import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Security2.AuthenticationService;
import com.shahroz.contactbackend.Security2.JwtService;
import com.shahroz.contactbackend.Security2.LoginResponse;
import com.shahroz.contactbackend.Security2.LoginUserDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    public AuthenticationController(AuthenticationService authenticationService, JwtService jwtService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        log.debug("Received login request for user: {}", loginUserDto.getUsername());
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        if (authenticatedUser == null) {
            log.error("Authentication failed for user: {}", loginUserDto.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setExpiresIn(jwtService.getExpirationTime());
        loginResponse.setToken(jwtToken);
        loginResponse.setUsername(authenticatedUser.getUsername());
        log.debug("Generated token for user: {}", loginResponse);

        return ResponseEntity.ok(loginResponse);
    }


    @GetMapping("/current-user")
    public ResponseEntity<String> getCurrentUser(Principal principal){
        if(!principal.getName().isEmpty())
        return ResponseEntity.ok(principal.getName());

        return ResponseEntity.ok("Not found");
    }
}
