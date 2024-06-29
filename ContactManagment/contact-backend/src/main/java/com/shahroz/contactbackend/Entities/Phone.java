package com.shahroz.contactbackend.Entities;


import jakarta.persistence.*;
import lombok.*;

@Entity

@Builder
@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class Phone {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long phoneId;

@ManyToOne
@JoinColumn(name = "contactId" , nullable = false)
private Contact contact;

@Column(nullable = false)
private String phoneNumber;

@Column(nullable = false)
private String label;


}
