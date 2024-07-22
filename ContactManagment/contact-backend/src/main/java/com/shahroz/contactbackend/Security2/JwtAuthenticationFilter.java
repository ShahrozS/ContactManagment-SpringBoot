package com.shahroz.contactbackend.Security2;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final CustomLogoutHandler logoutHandler;


    public JwtAuthenticationFilter(JwtService jwtService, CustomLogoutHandler logoutHandler, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.logoutHandler = logoutHandler;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("JwtAuthenticationFilter: Processing request for URL: " + request.getRequestURI());
        String authHeader = request.getHeader("Authorization");
        String jwt = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            username = jwtService.extractUsername(jwt);
            System.out.println("JwtAuthenticationFilter: Extracted JWT: " + jwt + ", Username: " + username);
        }
        if(logoutHandler.isTokenBlacklisted(jwt)){
            System.out.println("In logout token fucntion check ");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }



        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            var userDetails = this.userDetailsService.loadUserByUsername(username);
            System.out.println("JwtAuthenticationFilter: Loaded user details for username: " + username);

            if (jwtService.isTokenValid(jwt, userDetails)) {
                System.out.println("JwtAuthenticationFilter: JWT is valid for username: " + username);
                var usernamePasswordAuthenticationToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            } else {
                System.out.println("JwtAuthenticationFilter: JWT is invalid for username: " + username);
            }

        }
        filterChain.doFilter(request, response);
        System.out.println("JwtAuthenticationFilter: Proceeding to the next filter");
    }
}
