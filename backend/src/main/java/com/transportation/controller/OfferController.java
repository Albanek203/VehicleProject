package com.transportation.controller;

import com.transportation.dto.OfferDto;
import com.transportation.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/offer")
public class OfferController {
    private final OfferService offerService;

    @GetMapping()
    public List<OfferDto> getAll() {
        return offerService.getAll();
    }

    @GetMapping("/{id}")
    public OfferDto get(@PathVariable Long id) {
        return offerService.get(id);
    }

    //@PreAuthorize("hasAnyRole('TRANSPORTER','ADMIN')")
    @PostMapping
    public OfferDto create(@RequestBody OfferDto model) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userEmail;
        if (principal instanceof UserDetails) {
            userEmail = ((UserDetails) principal).getUsername();
        } else {
            userEmail = principal.toString();
        }
        return offerService.create(model, userEmail);
    }

    //@PreAuthorize("hasAnyRole('TRANSPORTER','ADMIN')")
    @PutMapping("/{id}")
    public OfferDto update(@PathVariable Long id, @RequestBody OfferDto model) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userEmail;
        if (principal instanceof UserDetails) {
            userEmail = ((UserDetails) principal).getUsername();
        } else {
            userEmail = principal.toString();
        }
        return offerService.update(id, model, userEmail);
    }

    //@PreAuthorize("hasAnyRole('TRANSPORTER','ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        offerService.delete(id);
    }
}