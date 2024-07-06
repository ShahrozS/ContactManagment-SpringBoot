    package com.shahroz.contactbackend.Entities;


    import com.fasterxml.jackson.annotation.JsonProperty;
    import jakarta.persistence.*;
    import lombok.*;

    import java.util.HashSet;
    import java.util.Set;

    @Entity
    @ToString
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public class Contact {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long contact_id;

        @ManyToOne
        @JoinColumn(name = "owner_id", nullable = false)
        private User owner;

        @ManyToOne
        @JoinColumn(name = "friend_id")
        private User friend;

        @JsonProperty("firstName")
        private String firstName;
        private String lastName;
        private String title;

        @ToString.Exclude
        @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, orphanRemoval = true)
        private Set<Email> emails;

        @ToString.Exclude
        @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, orphanRemoval = true)
        private Set<Phone> phones;


    }
