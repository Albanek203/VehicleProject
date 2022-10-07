package com.transportation.dto;

import lombok.Data;

import java.util.List;

@Data
public class TransporterDto {
    private long id;
    private String name;
    private String phone;
    private List<IdWrapper> offers;
}