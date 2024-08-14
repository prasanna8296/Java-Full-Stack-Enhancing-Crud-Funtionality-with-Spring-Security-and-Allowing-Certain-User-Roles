package com.java.ems.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class UserRegistrationDto {
    private String username;
    private String email;
    private String password;
    private Set<String> roles;  // List of role names
}
