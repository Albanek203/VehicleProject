package com.transportation.controller;

import com.transportation.dto.TransporterDto;
import com.transportation.service.TransporterService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/transporter")
public class TransporterController {
    private final TransporterService transporterService;

    @GetMapping()
    public Page<TransporterDto> getAll(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String phone,
            @RequestParam(required = false) Long userId,
            @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return transporterService.getAll(id, name, phone, userId, pageable);
    }

    @GetMapping("/{id}")
    public TransporterDto get(@PathVariable Long id) {
        return transporterService.get(id);
    }

    //@PreAuthorize("hasAnyRole('TRANSPORTER','ADMIN')")
    @PostMapping
    public TransporterDto create(@RequestBody TransporterDto model) {
        return transporterService.create(model);
    }

    //@PreAuthorize("hasAnyRole('TRANSPORTER','ADMIN')")
    @PutMapping("/{id}")
    public TransporterDto update(@PathVariable Long id, @RequestBody TransporterDto model) {
        return transporterService.update(id, model);
    }

    //@PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        transporterService.delete(id);
    }
}