package com.transportation.controller;

import com.transportation.dto.DeliveryDto;
import com.transportation.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {
    private final DeliveryService deliveryService;

    @GetMapping()
    public Page<DeliveryDto> getAll(@PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return deliveryService.getAll(pageable);
    }

    @GetMapping("/{id}")
    public DeliveryDto get(@PathVariable Long id) {
        return deliveryService.get(id);
    }

    //@PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @PostMapping
    public DeliveryDto create(@RequestBody DeliveryDto model) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userEmail;
        if (principal instanceof UserDetails) {
            userEmail = ((UserDetails) principal).getUsername();
        } else {
            userEmail = principal.toString();
        }
        return deliveryService.create(model, userEmail);
    }

    //@PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @PostMapping("/{id}")
    public DeliveryDto update(@PathVariable Long id, @RequestBody DeliveryDto model) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userEmail;
        if (principal instanceof UserDetails) {
            userEmail = ((UserDetails) principal).getUsername();
        } else {
            userEmail = principal.toString();
        }
        return deliveryService.update(id, model, userEmail);
    }

    //@PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        deliveryService.delete(id);
    }
}