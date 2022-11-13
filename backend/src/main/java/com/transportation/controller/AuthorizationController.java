package com.transportation.controller;

import com.transportation.dto.ProfileDto;
import com.transportation.service.AuthorizationService;
import com.transportation.service.UserService;
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
    private final UserService userService;

    @PreAuthorize("isAnonymous()")
    @PostMapping("signup")
    public void signup(@RequestBody ProfileDto model) {
        authorizationService.signup(model);
    }

    @PreAuthorize("isAnonymous()")
    @PostMapping("exists-email")
    public ResponseEntity isExistsEmail(@RequestHeader(EMAIL) String email) {
        if (authorizationService.isExistsEmail(email)) {
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PostMapping("active-user/{id}")
    public boolean isActiveUser(@PathVariable Long id) {
        if (userService.get(id).getActive()) {
            return true;
        }
        return false;
    }
}