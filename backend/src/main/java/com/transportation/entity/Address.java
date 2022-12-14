package com.transportation.entity;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class Address {
    private String country;
    private String city;
    private String street;
}
