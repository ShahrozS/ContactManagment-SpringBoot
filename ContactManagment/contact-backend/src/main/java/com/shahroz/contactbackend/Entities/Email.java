package com.shahroz.contactbackend.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "contact_id", nullable = false)
    private Contact contact;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String LabelEmail;

    public Email(long l, String mail) {
    }

    public Email(long l, String emailStr, Contact contact) {
    }

    @JsonProperty("Email")
    public void setEmail(String email) {
        this.email = email;
    }

    @JsonProperty("LabelEmail")
    public void setLabelEmail(String labelEmail) {
        this.LabelEmail = labelEmail;
    }
}
