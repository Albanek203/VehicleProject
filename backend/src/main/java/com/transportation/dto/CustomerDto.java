package com.transportation.dto;

import lombok.Data;

import java.util.List;

@Data
public class CustomerDto {
    private Long id;
    private String name;
    private String phone;
    private List<DeliveryDto> deliveries;
}