package com.transportation.service;

import com.transportation.dto.TransporterDto;
import com.transportation.entity.Transporter;
import com.transportation.exception.EntityNotFoundException;
import com.transportation.mapper.Mapper;
import com.transportation.repository.OfferRepository;
import com.transportation.repository.TransporterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Objects;

@RequiredArgsConstructor
@Service
public class TransporterService {
    private final TransporterRepository transporterRepository;
    private final OfferRepository offerRepository;
    private final Mapper mapper;

    public Page<TransporterDto> getAll(Long id, String name, String phone, Long userId, Pageable pageable) {
        return transporterRepository.findAllBy(id, name, phone, userId, pageable).map(mapper::toTransporterDto);
    }

    public TransporterDto get(Long id) { return mapper.toTransporterDto(retrieve(id)); }

    public TransporterDto create(TransporterDto dto) {
        Transporter transporter = new Transporter();
        mapper.mergeTransporter(dto, transporter);
        return mapper.toTransporterDto(transporterRepository.save(transporter));
    }

    public TransporterDto update(Long id, TransporterDto dto) {
        Transporter transporter = retrieve(id);
        mapper.mergeTransporter(dto, transporter);
        return mapper.toTransporterDto(transporterRepository.save(transporter));
    }

    public void delete(Long id) { transporterRepository.deleteById(id); }

    public Transporter getTransporterByUserId(Long id) {
        return transporterRepository.findAll().stream().filter(x -> Objects.equals(x.getUser().getId(), id)).findFirst().orElseThrow(() -> new EntityNotFoundException("Transporter", id));
    }

    private Transporter retrieve(Long id) {
        return transporterRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Transporter", id));
    }
}
