package com.transportation.dto;

import lombok.Data;

@Data
public class CargoDto {
    private Long id;
    private int count;
    private String name;
    private String unit;
    private int totalWeight;
    private int totalVolume;
    private boolean isFragile;
}