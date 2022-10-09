package com.transportation.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class Cargo {
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int count;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String unit;
    @Column(nullable = false)
    private int totalWeight;
    private int totalVolume;
    private boolean isFragile;
}
