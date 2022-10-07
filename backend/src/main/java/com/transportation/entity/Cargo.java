package com.transportation.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Cargo {
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
