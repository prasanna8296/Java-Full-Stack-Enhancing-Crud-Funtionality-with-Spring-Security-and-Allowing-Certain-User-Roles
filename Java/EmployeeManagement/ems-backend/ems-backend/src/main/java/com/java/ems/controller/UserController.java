package com.java.ems.controller;

import com.java.ems.dto.UserRegistrationDto;
import com.java.ems.entity.Role;
import com.java.ems.entity.User;
import com.java.ems.service.RoleService;
import com.java.ems.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;  // Inject RoleService

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        Set<Role> roles = userDto.getRoles().stream()
                .map(roleName -> {
                    Role existingRole = roleService.findByName(roleName)
                            .orElseGet(() -> roleService.saveRole(new Role(roleName)));
                    return existingRole;
                })
                .collect(Collectors.toSet());

        user.setRoles(roles);
        userService.saveUser(user);
        return ResponseEntity.ok("User Registered Successfully");
    }
}

