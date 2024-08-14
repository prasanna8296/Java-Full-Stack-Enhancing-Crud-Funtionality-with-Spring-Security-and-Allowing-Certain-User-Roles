package com.java.ems.service.impl;

import com.java.ems.entity.Role;
import com.java.ems.entity.User;
import com.java.ems.repository.UserRepository;
import com.java.ems.service.RoleService;
import com.java.ems.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleService roleService;  // Inject RoleService

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        Set<Role> roles = user.getRoles().stream()
                .map(role -> {
                    Role existingRole = roleService.findByName(role.getName())
                            .orElseGet(() -> roleService.saveRole(role));
                    return existingRole;
                })
                .collect(Collectors.toSet());

        if (roles.isEmpty()) {
            Role defaultRole = roleService.findByName("user")
                    .orElseGet(() -> roleService.saveRole(new Role("user")));
            roles.add(defaultRole);
        }

        user.setRoles(roles);
        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
