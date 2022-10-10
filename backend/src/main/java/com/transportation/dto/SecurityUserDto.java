package com.transportation.dto;

import com.transportation.entity.User;
import com.transportation.enums.Role;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class SecurityUserDto {
    private Long id;
    private String email;
    private Role role;
    private String name;
    private String surname;

    public static SecurityUserDto of(User user) {
        return new SecurityUserDto()
                .setId(user.getId())
                .setEmail(user.getEmail())
                .setName(user.getName())
                .setSurname(user.getSurname())
                .setRole(user.getRole());
    }
}