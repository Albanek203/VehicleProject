package com.transportation.controller;

import com.transportation.dto.CustomerDto;
import com.transportation.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    private final CustomerService customerService;

    @GetMapping()
    public List<CustomerDto> getAll() {
        return customerService.getAll();
    }

    @GetMapping("/{id}")
    public CustomerDto get(@PathVariable Long id) {
        return customerService.get(id);
    }

    //@PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @PostMapping
    public CustomerDto create(@RequestBody CustomerDto model) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userEmail;
        if (principal instanceof UserDetails) {
            userEmail = ((UserDetails) principal).getUsername();
        } else {
            userEmail = principal.toString();
        }
        return customerService.create(model, userEmail);
    }

    //@PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @PutMapping("/{id}")
    public CustomerDto update(@PathVariable Long id, @RequestBody CustomerDto model) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userEmail;
        if (principal instanceof UserDetails) {
            userEmail = ((UserDetails) principal).getUsername();
        } else {
            userEmail = principal.toString();
        }
        return customerService.update(id, model, userEmail);
    }

    //@PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        customerService.delete(id);
    }
}