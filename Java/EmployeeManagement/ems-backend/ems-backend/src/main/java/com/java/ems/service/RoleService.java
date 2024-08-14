package com.java.ems.service;

import com.java.ems.entity.Role;

import java.util.Optional;

public interface RoleService {
    Role saveRole(Role role);
    Optional<Role> findByName(String name);
}
