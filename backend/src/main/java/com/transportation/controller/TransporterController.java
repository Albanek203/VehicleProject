package com.transportation.controller;

import com.transportation.dto.TransporterDto;
import com.transportation.service.TransporterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/transporter")
public class TransporterController {
    private final TransporterService transporterService;

    @GetMapping()
    public List<TransporterDto> getAll() {
        return transporterService.getAll();
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