package com.transportation.service;

import com.transportation.dto.CustomerDto;
import com.transportation.dto.IdWrapper;
import com.transportation.entity.Customer;
import com.transportation.entity.Delivery;
import com.transportation.entity.User;
import com.transportation.exception.EntityNotFoundException;
import com.transportation.exception.ReferenceNotFoundException;
import com.transportation.mapper.Mapper;
import com.transportation.repository.CustomerRepository;
import com.transportation.repository.DeliveryRepository;
import com.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final DeliveryRepository deliveryRepository;
    private final UserRepository userRepository;
    private final Mapper mapper;

    public List<CustomerDto> getAll() { return customerRepository.findAll().stream().map(mapper::toCustomerDto).toList(); }

    public CustomerDto get(Long id) {
        return mapper.toCustomerDto(retrieve(id));
    }

    public CustomerDto create(CustomerDto dto, String userEmail) {
        Customer customer = new Customer();
        List<Delivery> deliveries = dto.getDeliveries().stream()
                .map(IdWrapper::getId)
                .map(deliveryId -> deliveryRepository.findById(deliveryId).orElseThrow(() -> new ReferenceNotFoundException("Delivery", deliveryId)))
                .toList();
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ReferenceNotFoundException("User", userEmail));
        mapper.mergeCustomer(dto, customer);
        customer.setDeliveries(new ArrayList<>(deliveries));
        customer.setUser(user);
        return mapper.toCustomerDto(customerRepository.save(customer));
    }

    public CustomerDto update(Long id, CustomerDto dto, String userEmail) {
        Customer customer = retrieve(id);
        List<Delivery> deliveries = dto.getDeliveries().stream()
                .map(IdWrapper::getId)
                .map(deliveryId -> deliveryRepository.findById(deliveryId).orElseThrow(() -> new ReferenceNotFoundException("Delivery", deliveryId)))
                .toList();
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ReferenceNotFoundException("User", userEmail));
        mapper.mergeCustomer(dto, customer);
        customer.setDeliveries(new ArrayList<>(deliveries));
        customer.setUser(user);
        return mapper.toCustomerDto(customerRepository.save(customer));
    }

    public void delete(Long id) { customerRepository.deleteById(id); }

    public Customer getCustomerByUserId(Long id) {
        return customerRepository.findAll().stream().filter(x -> Objects.equals(x.getUser().getId(), id)).findFirst().orElseThrow(() -> new EntityNotFoundException("Customer", id));
    }

    private Customer retrieve(Long id) {
        return customerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Customer", id));
    }
}
