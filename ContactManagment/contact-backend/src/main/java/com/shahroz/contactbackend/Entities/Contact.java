    package com.shahroz.contactbackend.Entities;


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

        private String firstName;
        private String lastName;
        private String title;

        @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, orphanRemoval = true)
        private Set<Email> emails;

        @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, orphanRemoval = true)
        private Set<Phone> phones;


    }
