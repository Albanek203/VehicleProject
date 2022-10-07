package com.transportation.service;

import com.transportation.dto.DeliveryDto;
import com.transportation.dto.IdWrapper;
import com.transportation.entity.Cargo;
import com.transportation.entity.Customer;
import com.transportation.entity.Delivery;
import com.transportation.entity.User;
import com.transportation.exception.EntityNotFoundException;
import com.transportation.exception.ReferenceNotFoundException;
import com.transportation.mapper.Mapper;
import com.transportation.repository.CargoRepository;
import com.transportation.repository.DeliveryRepository;
import com.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DeliveryService {
    private final DeliveryRepository deliveryRepository;
    private final CustomerService customerService;
    private final UserRepository userRepository;
    private final CargoRepository cargoRepository;
    private final Mapper mapper;

    public List<DeliveryDto> getAll() { return deliveryRepository.findAll().stream().map(mapper::toDeliveryDto).toList(); }

    public DeliveryDto get(Long id) { return mapper.toDeliveryDto(retrieve(id)); }

    public DeliveryDto create(DeliveryDto dto, String userEmail) {
        Delivery delivery = new Delivery();
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ReferenceNotFoundException("User", userEmail));
        Customer customer = customerService.getCustomerByUserId(user.getId());
        List<Cargo> cargos = dto.getCargos().stream()
                .map(IdWrapper::getId)
                .map(cargoId -> cargoRepository.findById(cargoId).orElseThrow(() -> new ReferenceNotFoundException("Cargo", cargoId)))
                .toList();
        mapper.mergeDelivery(dto, delivery);
        delivery.setCustomer(customer);
        delivery.setCargos(cargos);
        return mapper.toDeliveryDto(deliveryRepository.save(delivery));
    }

    public DeliveryDto update(Long id, DeliveryDto dto, String userEmail) {
        Delivery delivery = retrieve(id);
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ReferenceNotFoundException("User", userEmail));
        Customer customer = customerService.getCustomerByUserId(user.getId());
        List<Cargo> cargos = dto.getCargos().stream()
                .map(IdWrapper::getId)
                .map(cargoId -> cargoRepository.findById(cargoId).orElseThrow(() -> new ReferenceNotFoundException("Cargo", cargoId)))
                .toList();
        mapper.mergeDelivery(dto, delivery);
        delivery.setCustomer(customer);
        delivery.setCargos(cargos);
        return mapper.toDeliveryDto(deliveryRepository.save(delivery));
    }

    public void delete(Long id) { deliveryRepository.deleteById(id); }

    private Delivery retrieve(Long id) {
        return deliveryRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Delivery", id));
    }
}
