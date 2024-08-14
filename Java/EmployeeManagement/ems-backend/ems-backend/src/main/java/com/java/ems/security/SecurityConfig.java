package com.java.ems.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public SecurityConfig(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()  // Allow access to register and login
                        .requestMatchers("/api/employees/**").permitAll()  // Allow all authenticated users to access employee endpoints
                        .requestMatchers("/api/employees/**").hasAuthority("admin")  // Only admins can delete employees
                        .anyRequest().authenticated()  // All other requests require authentication
                )
                .formLogin().disable()  // Disable default form login
                .httpBasic()  // Enable HTTP Basic authentication
                .and()
                .csrf().disable()  // Disable CSRF protection (useful for non-browser clients)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED);  // Use sessions for stateful authentication

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
