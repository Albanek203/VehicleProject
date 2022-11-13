package com.transportation.dto;

import com.transportation.enums.Role;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String email;
    private Role role;
    private String name;
    private String surname;
    private Boolean active;
}