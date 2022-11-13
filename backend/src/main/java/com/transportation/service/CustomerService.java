package com.transportation.service;

import com.transportation.dto.CustomerDto;
import com.transportation.entity.Customer;
import com.transportation.entity.User;
import com.transportation.exception.EntityNotFoundException;
import com.transportation.exception.ReferenceNotFoundException;
import com.transportation.mapper.Mapper;
import com.transportation.repository.CustomerRepository;
import com.transportation.repository.DeliveryRepository;
import com.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Objects;

@RequiredArgsConstructor
@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    private final DeliveryRepository deliveryRepository;
    private final UserRepository userRepository;
    private final Mapper mapper;

    public Page<CustomerDto> getAll(Long id, String name, String phone, Long userId, Pageable pageable) {
        return customerRepository.findAllBy(id, name, phone, userId, pageable).map(mapper::toCustomerDto);
    }

    public CustomerDto get(Long id) {
        return mapper.toCustomerDto(retrieve(id));
    }

    public CustomerDto create(CustomerDto dto, String userEmail) {
        Customer customer = new Customer();
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ReferenceNotFoundException("User", userEmail));
        mapper.mergeCustomer(dto, customer);
        customer.setUser(user);
        return mapper.toCustomerDto(customerRepository.save(customer));
    }

    public CustomerDto update(Long id, CustomerDto dto, String userEmail) {
        Customer customer = retrieve(id);
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ReferenceNotFoundException("User", userEmail));
        mapper.mergeCustomer(dto, customer);
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
