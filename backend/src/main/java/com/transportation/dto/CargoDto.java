package com.transportation.dto;

import lombok.Data;

@Data
public class CargoDto {
    private Long id;
    private int count;
    private String name;
    private String unit;
    private float totalWeight;
    private float totalVolume;
    private boolean isFragile;
    private DeliveryShortDto delivery;
}