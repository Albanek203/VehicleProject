package com.transportation.controller;

import com.transportation.dto.ProfileDto;
import com.transportation.service.AuthorizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/auth")
public class AuthorizationController {
    private final String EMAIL = "email";
    private final AuthorizationService authorizationService;

    @PreAuthorize("isAnonymous()")
    @PostMapping("signup")
    public void signup(@RequestBody ProfileDto model) {
        authorizationService.signup(model);
    }

    @PreAuthorize("isAnonymous()")
    @PostMapping
    public ResponseEntity isExistsEmail(@RequestHeader(EMAIL) String email) {
        if (authorizationService.isExistsEmail(email)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}