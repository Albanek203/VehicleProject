package com.transportation.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.transportation.enums.DeliveryStatus;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class Delivery {
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int price;
    private String unit;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "country", column = @Column(name = "country_from")),
            @AttributeOverride(name = "city", column = @Column(name = "city_from")),
            @AttributeOverride(name = "street", column = @Column(name = "street_from"))
    })
    private Address addressFrom;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "country", column = @Column(name = "country_to")),
            @AttributeOverride(name = "city", column = @Column(name = "city_to")),
            @AttributeOverride(name = "street", column = @Column(name = "street_to"))
    })
    private Address addressTo;

    private LocalDate createdDate = LocalDate.now();
    private LocalDate departureDate = LocalDate.now();
    private LocalDate arrivalDate = LocalDate.now();
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private DeliveryStatus status;
    private String description;

    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @ManyToOne
    private Customer customer;
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @OneToMany(mappedBy = "delivery", fetch = FetchType.LAZY)
    private List<Cargo> cargos;
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @OneToMany(mappedBy = "delivery", fetch = FetchType.LAZY)
    private List<Offer> offers;
}
