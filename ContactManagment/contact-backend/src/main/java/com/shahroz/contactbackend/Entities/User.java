package com.shahroz.contactbackend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Set;



@Table(name = "users")
@Entity

@Builder
@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor

public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    @Column(unique = true)
    private String email;
    private String password;

    private String firstName;
    private String lastName;
    private String address;

    @Column(unique = true)
    private String phoneNumber;


    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private Role role;

    @OneToMany(mappedBy = "owner",cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<Contact> contacts;


    private int userType;
    @Version
    private Long version;
    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }




    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (role != null) {
            return List.of(new SimpleGrantedAuthority(role.name()));
        } else {
            // Handle the case where role is null (e.g., provide default authority).
            return Collections.emptyList(); // or any other appropriate action
        }
    }
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setId(long l) {

    }
}
