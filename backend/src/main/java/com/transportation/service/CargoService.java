package com.transportation.service;

import com.transportation.dto.CargoDto;
import com.transportation.entity.Cargo;
import com.transportation.exception.EntityNotFoundException;
import com.transportation.mapper.Mapper;
import com.transportation.repository.CargoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor

@Service
public class CargoService {
    private final CargoRepository cargoRepository;
    private final Mapper mapper;

    public List<CargoDto> getAll() { return cargoRepository.findAll().stream().map(mapper::toCargoDto).toList(); }

    public CargoDto get(Long id) {
        return mapper.toCargoDto(retrieve(id));
    }

    public CargoDto create(CargoDto dto) {
        Cargo cargo = cargoRepository.save(mapper.toCargo(dto));
        return mapper.toCargoDto(cargo);
    }

    public CargoDto update(Long id, CargoDto dto) {
        Cargo cargo = retrieve(id);
        mapper.mergeCargo(dto, cargo);
        return mapper.toCargoDto(cargoRepository.save(cargo));
    }

    public void delete(Long id) { cargoRepository.deleteById(id); }

    private Cargo retrieve(Long id) {
        return cargoRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Cargo", id));
    }
}
