package com.shahroz.contactbackend.Security2;

import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Security2.AuthenticationService;
import com.shahroz.contactbackend.Security2.JwtService;
import com.shahroz.contactbackend.Security2.LoginResponse;
import com.shahroz.contactbackend.Security2.LoginUserDto;
import com.shahroz.contactbackend.Services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;


@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;
    private final UserService userService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService, JwtService jwtService, UserService userService) {
        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
        this.userService = userService;
    }



    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDto loginUserDto) {
        log.debug("Received login request for user: {}", loginUserDto.getUsername());
        try {

            String username = "";
            User user;


            //handleing both email and phone.
            if(!loginUserDto.getUsername().contains("@")){

                user = userService.getUserFromPhoneNumber(loginUserDto.getUsername());

                 username = user.getEmail();
            }else{
                username = loginUserDto.getUsername();

                user = userService.findByEmail(loginUserDto.getUsername());
            }

            if(user==null){
                throw new UsernameNotFoundException("Username not found");
            }


            loginUserDto.setUsername(username);


            User authenticatedUser = authenticationService.authenticate(loginUserDto);

            String jwtToken = jwtService.generateToken(authenticatedUser);

            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setExpiresIn(jwtService.getExpirationTime());
            loginResponse.setToken(jwtToken);
            loginResponse.setUsername(authenticatedUser.getUsername());


            log.debug("Generated token for user: {}", loginResponse);
            log.info("Logging in");
            return ResponseEntity.ok(loginResponse);
        } catch (UsernameNotFoundException ex) {
            log.error("User not found: {}", loginUserDto.getUsername());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        } catch (BadCredentialsException ex) {
            log.error("Invalid credentials for user: {}", loginUserDto.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        } catch (Exception ex) {
            log.error("An error occurred during authentication", ex);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during authentication.");
        }
    }


    @PostMapping("/save")
    ResponseEntity<User> saveUser(@RequestBody User user){
        try{

            User user1 = userService.createUser(user);

            log.info("Saved the user");
            return ResponseEntity.ok(user1);

        }catch(Exception e){
            log.error("Exception in controller, save user {}" , e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }
    }

    @GetMapping("/current-user")
    public ResponseEntity<String> getCurrentUser(Principal principal){
        log.info("Getting current user");

        if(!principal.getName().isEmpty())
        return ResponseEntity.ok(principal.getName());


        return ResponseEntity.ok("Not found");
    }
}
