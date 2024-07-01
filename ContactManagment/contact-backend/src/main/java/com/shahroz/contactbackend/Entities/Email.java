package com.shahroz.contactbackend.Entities;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long emailID;

    @ManyToOne
    @JoinColumn(name = "contact_id", nullable = false)
    private Contact contact;

    @Column(nullable = false)
    private String Email;

    @Column(nullable = false)
    private String LabelEmail;

    // Getters and setters
}
