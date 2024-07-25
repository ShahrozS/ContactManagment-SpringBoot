package com.shahroz.contactbackend.Security2;
import com.shahroz.contactbackend.Entities.User;
import com.shahroz.contactbackend.Repository.Userrepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class AuthenticationService {
    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserDetailsService userDetailsService, AuthenticationManager authenticationManager) {
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
    }

    public User authenticate(LoginUserDto loginUserDto) {
        try {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(loginUserDto.getUsername(), loginUserDto.getPassword());
            Authentication authentication = authenticationManager.authenticate(authToken);

            if (authentication.isAuthenticated()) {
                return (User) userDetailsService.loadUserByUsername(loginUserDto.getUsername());
            } else {
                throw new BadCredentialsException("Invalid credentials");
            }
        } catch (UsernameNotFoundException e) {
            throw new UsernameNotFoundException("User not found");
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid credentials");
        } catch (Exception e) {
            throw new RuntimeException("Unexpected authentication error", e);
        }
    }

}