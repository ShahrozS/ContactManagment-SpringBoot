package com.shahroz.contactbackend.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity

@Builder
@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class Email {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emailID;

    @ManyToOne
    @JoinColumn(name = "contactId", nullable = false)
    private Contact contact;


    @Column(nullable = false)
    private String emailAddress;

    @Column(nullable = false)
    private String label;





}
