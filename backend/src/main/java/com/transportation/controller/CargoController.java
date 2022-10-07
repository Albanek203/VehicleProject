package com.transportation.controller;

import com.transportation.dto.CargoDto;
import com.transportation.service.CargoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/cargo")
public class CargoController {
    private final CargoService cargoService;

    @GetMapping()
    public List<CargoDto> getAll() {
        return cargoService.getAll();
    }

    @GetMapping("/{id}")
    public CargoDto get(@PathVariable Long id) {
        return cargoService.get(id);
    }

    @PostMapping
    public CargoDto create(@RequestBody CargoDto model) {
        return cargoService.create(model);
    }

    @PutMapping("/{id}")
    public CargoDto update(@PathVariable Long id, @RequestBody CargoDto model) {
        return cargoService.update(id, model);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        cargoService.delete(id);
    }
}