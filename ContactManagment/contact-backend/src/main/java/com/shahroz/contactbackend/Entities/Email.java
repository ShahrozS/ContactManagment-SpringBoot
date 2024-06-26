package com.shahroz.contactbackend.Entities;

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

    @ManyToOne
    @JoinColumn(name = "contact_id", nullable = false)
    private Contact contact;

    @Column(nullable = false)
    private String Email;

    @Column(nullable = false)
    private String LabelEmail;

    @JsonProperty("Email")
    public void setEmail(String email) {
        this.Email = email;
    }

    @JsonProperty("LabelEmail")
    public void setLabelEmail(String labelEmail) {
        this.LabelEmail = labelEmail;
    }
}
