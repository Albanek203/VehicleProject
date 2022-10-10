package com.transportation.controller;

import com.transportation.dto.UserDto;
import com.transportation.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    //@PreAuthorize("hasAnyRole('ADMIN','SUPPORT')")
    @GetMapping()
    public List<UserDto> getAll() {
        return userService.getAll();
    }

    //@PreAuthorize("hasAnyRole('ADMIN','SUPPORT')")
    @GetMapping("/{id}")
    public UserDto get(@PathVariable Long id) { return userService.get(id); }

    //@PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public UserDto create(@RequestBody UserDto model) { return userService.create(model); }

    //@PreAuthorize("hasAnyRole('ADMIN','SUPPORT')")
    @PutMapping("/{id}")
    public UserDto update(@PathVariable Long id, @RequestBody UserDto model) {
        return userService.update(id, model);
    }

    //@PreAuthorize("hasAnyRole('ADMIN','SUPPORT')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}