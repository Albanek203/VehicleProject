package com.transportation.dto;

import com.transportation.enums.DeliveryStatus;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class DeliveryDto {
    private long id;
    private int price;
    private String unit;
    private String country_from;
    private String city_from;
    private String street_from;
    private String country_to;
    private String city_to;
    private String street_to;
    private LocalDate createdDate = LocalDate.now();
    private LocalDate departureDate = LocalDate.now();
    private LocalDate arrivalDate = LocalDate.now();
    private DeliveryStatus status;
    private String description;
    private List<IdWrapper> cargos;
}
