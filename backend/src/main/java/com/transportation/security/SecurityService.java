package com.transportation.security;


import com.transportation.entity.User;
import com.transportation.exception.AuthenticationRequiredException;
import com.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityService {
    private final UserRepository userRepository;

    public User getUser() {
        return this.userRepository.findByEmail(getCurrentUserEmail()).orElseThrow(AuthenticationRequiredException::new);
    }

    public String getCurrentUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
