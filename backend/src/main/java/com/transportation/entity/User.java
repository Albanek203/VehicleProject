package com.transportation.entity;

import com.transportation.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;
    private String name;
    private String surname;
    @Column(nullable = false)
    private String password;
    @Column(columnDefinition = "boolean default true")
    private boolean active = true;
}
