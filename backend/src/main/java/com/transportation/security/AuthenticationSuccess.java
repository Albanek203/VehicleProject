package com.transportation.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.transportation.dto.SecurityUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.Charset;

@Component
public class AuthenticationSuccess implements AuthenticationSuccessHandler {
    @Autowired
    ObjectMapper objectMapper;
    @Autowired SecurityService securityService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.setCharacterEncoding(Charset.defaultCharset().name());
        objectMapper.writeValue(response.getWriter(), SecurityUserDto.of(securityService.getUser()));
    }
}
