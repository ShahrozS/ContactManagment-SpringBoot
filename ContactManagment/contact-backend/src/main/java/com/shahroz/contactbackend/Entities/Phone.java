package com.shahroz.contactbackend.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Phone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long phoneId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "contact_id", nullable = false)
    private Contact contact;

    @Column(nullable = false)
    private String PhoneNumber;

    @Column(nullable = false)
    private String LabelPhone;


    @JsonProperty("PhoneNumber")
    public void setPhoneNumber(String phoneNumber) {
        this.PhoneNumber = phoneNumber;
    }

    @JsonProperty("LabelPhone")
    public void setLabelPhone(String labelPhone) {
        this.LabelPhone= labelPhone;
    }

}
