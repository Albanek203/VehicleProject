package com.transportation.controller;

import com.transportation.dto.DeliveryDto;
import com.transportation.service.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {
    private final DeliveryService deliveryService;

    @GetMapping()
    public Page<DeliveryDto> getAll(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String addressFrom,
            @RequestParam(required = false) String addressTo,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Long customerId,
            @RequestParam(required = false) Long price,
            @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return deliveryService.getAll(id, addressFrom, addressTo, description, customerId, price, searchTerm, pageable);
    }

    @GetMapping("/{id}")
    public DeliveryDto get(@PathVariable Long id) {
        return deliveryService.get(id);
    }


    @PostMapping
    public DeliveryDto create(@RequestBody DeliveryDto model) {
        return deliveryService.create(model);
    }

    @PutMapping("/{id}")
    public DeliveryDto update(@PathVariable Long id, @RequestBody DeliveryDto model) {
        return deliveryService.update(id, model);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        deliveryService.delete(id);
    }
}