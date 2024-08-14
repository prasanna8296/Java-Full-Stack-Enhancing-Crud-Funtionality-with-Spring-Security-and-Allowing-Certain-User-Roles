package com.java.ems.service;

import com.java.ems.entity.User;

import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User>findByUsername(String username);
}
