package com.transportation.service;

import com.transportation.dto.DeliveryDto;
import com.transportation.entity.Delivery;
import com.transportation.exception.EntityNotFoundException;
import com.transportation.mapper.Mapper;
import com.transportation.repository.DeliveryRepository;
import com.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class DeliveryService {
    private final DeliveryRepository deliveryRepository;
    private final Mapper mapper;

    public Page<DeliveryDto> getAll(Long id, String addressFrom, String addressTo, String description, Long customerId, Long price, String searchTerm, Pageable pageable) {
        return deliveryRepository.findAllBy(id, addressFrom, addressTo, description, customerId, price, searchTerm, pageable).map(mapper::toDeliveryDto);
    }

    public DeliveryDto get(Long id) { return mapper.toDeliveryDto(retrieve(id)); }

    public DeliveryDto create(DeliveryDto dto) {
        Delivery delivery = new Delivery();
        mapper.mergeDelivery(dto, delivery);
        return mapper.toDeliveryDto(deliveryRepository.save(delivery));
    }

    public DeliveryDto update(Long id, DeliveryDto dto) {
        Delivery delivery = retrieve(id);
        mapper.mergeDelivery(dto, delivery);
        return mapper.toDeliveryDto(deliveryRepository.save(delivery));
    }

    public void delete(Long id) { deliveryRepository.deleteById(id); }

    private Delivery retrieve(Long id) {
        return deliveryRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Delivery", id));
    }
}
