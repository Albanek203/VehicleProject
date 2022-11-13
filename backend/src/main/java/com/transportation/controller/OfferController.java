package com.transportation.controller;

import com.transportation.dto.OfferDto;
import com.transportation.service.DeliveryService;
import com.transportation.service.OfferService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/offer")
public class OfferController {
    private final OfferService offerService;
    private final DeliveryService deliveryService;

    @GetMapping()
    public Page<OfferDto> getAll(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long deliveryId,
            @RequestParam(required = false) Long transporterId,
            @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return offerService.getAll(id, description, status, deliveryId, transporterId, searchTerm,pageable);
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