package com.transportation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDto {
    private long id;
    private String name;
    private String phone;
    private List<IdWrapper> deliveries;
}
