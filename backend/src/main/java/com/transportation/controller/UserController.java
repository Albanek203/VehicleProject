package com.transportation.controller;

import com.transportation.dto.UserDto;
import com.transportation.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @PreAuthorize("hasAnyRole('ADMIN','SUPPORT')")
    @GetMapping()
    public Page<UserDto> getAll(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String surname,
            @RequestParam(required = false) String email,
            @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return userService.getAll(id, name, surname, email, pageable);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPPORT')")
    @GetMapping("/{id}")
    public UserDto get(@PathVariable Long id) { return userService.get(id); }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public UserDto create(@RequestBody UserDto model) { return userService.create(model); }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{id}")
    public UserDto update(@PathVariable Long id, @RequestBody UserDto model) {
        return userService.update(id, model);
    }

    @PreAuthorize("hasAnyRole('ADMIN','SUPPORT')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}