package com.transportation.service;

import com.transportation.dto.DeliveryDto;
import com.transportation.entity.Customer;
import com.transportation.entity.Delivery;
import com.transportation.entity.User;
import com.transportation.exception.EntityNotFoundException;
import com.transportation.exception.ReferenceNotFoundException;
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
    private final CustomerService customerService;
    private final UserRepository userRepository;
    private final Mapper mapper;

    public Page<DeliveryDto> getAll(Pageable pageable) {
        return deliveryRepository.findAll(pageable).map(mapper::toDeliveryDto);
    }

    public DeliveryDto get(Long id) { return mapper.toDeliveryDto(retrieve(id)); }

    public DeliveryDto create(DeliveryDto dto, String userEmail) {
        Delivery delivery = new Delivery();
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ReferenceNotFoundException("User", userEmail));
        Customer customer = customerService.getCustomerByUserId(user.getId());
        mapper.mergeDelivery(dto, delivery);
        delivery.setCustomer(customer);
        return mapper.toDeliveryDto(deliveryRepository.save(delivery));
    }

    public DeliveryDto update(Long id, DeliveryDto dto, String userEmail) {
        Delivery delivery = retrieve(id);
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ReferenceNotFoundException("User", userEmail));
        Customer customer = customerService.getCustomerByUserId(user.getId());
        mapper.mergeDelivery(dto, delivery);
        delivery.setCustomer(customer);
        return mapper.toDeliveryDto(deliveryRepository.save(delivery));
    }

    public void delete(Long id) { deliveryRepository.deleteById(id); }

    private Delivery retrieve(Long id) {
        return deliveryRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Delivery", id));
    }
}
