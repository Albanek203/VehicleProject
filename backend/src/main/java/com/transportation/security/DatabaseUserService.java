package com.transportation.security;

import com.transportation.entity.User;
import com.transportation.exception.AccountIsNotActivatedException;
import com.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseUserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //return userRepository.findByEmail(username).map(CustomUserDetails::new).orElseThrow(() -> new UsernameNotFoundException(username));
        User user = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException(username));

        if (!user.getIsActivated()) throw new AccountIsNotActivatedException();

        return org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().toString())
                .build();
    }
}
