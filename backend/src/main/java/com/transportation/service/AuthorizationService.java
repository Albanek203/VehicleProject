package com.transportation.service;

import com.transportation.dto.ProfileDto;
import com.transportation.mapper.Mapper;
import com.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthorizationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Mapper mapper;

    public void signup(ProfileDto dto) {
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        userRepository.save(mapper.toUser(dto));
    }

    public boolean isExistsEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
