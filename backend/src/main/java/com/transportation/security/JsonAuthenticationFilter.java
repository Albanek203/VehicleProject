package com.transportation.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class JsonAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        Credential credential;
        try {
            credential = objectMapper.readValue(request.getInputStream(), Credential.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(
                        credential.getEmail().toLowerCase(),
                        credential.getPassword()
                )
        );
    }

    @Data
    private static class Credential {
        private String email;
        private String password;
    }
}
