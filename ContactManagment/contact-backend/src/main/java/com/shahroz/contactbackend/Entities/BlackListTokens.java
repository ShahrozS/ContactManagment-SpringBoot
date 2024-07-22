package com.shahroz.contactbackend.Entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlackListTokens {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long TokenID;

    private String token;


}
