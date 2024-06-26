    package com.shahroz.contactbackend.Entities;


    import jakarta.persistence.*;
    import lombok.*;

    @Table(name = "contacts")
    @Entity

    @Builder
    @AllArgsConstructor
    @Setter
    @Getter
    @NoArgsConstructor
    public class Contact {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long contact_id;

        @ManyToOne
        @JoinColumn(name = "owner_id", nullable = false)
        private User owner;


        @ManyToOne
        @JoinColumn(name = "friend_id",nullable=false)
        private User friend;

    }
