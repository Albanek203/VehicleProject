package com.transportation.mapper;

import com.transportation.dto.*;
import com.transportation.entity.*;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@org.mapstruct.Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface Mapper {
    // Cargo
    CargoDto toCargoDto(Cargo entity);
    Cargo toCargo(CargoDto dto);
    @Mapping(target = "id", ignore = true)
    void mergeCargo(CargoDto dto, @MappingTarget Cargo entity);


    // Customer
    CustomerDto toCustomerDto(Customer entity);
    @Mapping(target = "deliveries", ignore = true)
    @Mapping(target = "user", ignore = true)
    Customer toCustomer(CustomerDto dto);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "deliveries", ignore = true)
    @Mapping(target = "user", ignore = true)
    void mergeCustomer(CustomerDto dto, @MappingTarget Customer entity);


    // Delivery
    @Mapping(target = "status", defaultExpression = "java(com.transportation.enums.DeliveryStatus.NEW)")
    @Mapping(target = "country_from", source = "addressFrom.country")
    @Mapping(target = "city_from", source = "addressFrom.city")
    @Mapping(target = "street_from", source = "addressFrom.street")
    @Mapping(target = "country_to", source = "addressTo.country")
    @Mapping(target = "city_to", source = "addressTo.city")
    @Mapping(target = "street_to", source = "addressTo.street")
    DeliveryDto toDeliveryDto(Delivery entity);
    @Mapping(target = "status", defaultExpression = "java(com.transportation.enums.DeliveryStatus.NEW)")
    @Mapping(target = "country_from", source = "addressFrom.country")
    @Mapping(target = "city_from", source = "addressFrom.city")
    @Mapping(target = "street_from", source = "addressFrom.street")
    @Mapping(target = "country_to", source = "addressTo.country")
    @Mapping(target = "city_to", source = "addressTo.city")
    @Mapping(target = "street_to", source = "addressTo.street")
    DeliveryShortDto toDeliveryShortDto(Delivery entity);
    @Mapping(target = "customer", ignore = true)
    @Mapping(target = "cargos", ignore = true)
    @Mapping(target = "addressFrom.country", source = "country_from")
    @Mapping(target = "addressFrom.city", source = "city_from")
    @Mapping(target = "addressFrom.street", source = "street_from")
    @Mapping(target = "addressTo.country", source = "country_to")
    @Mapping(target = "addressTo.city", source = "city_to")
    @Mapping(target = "addressTo.street", source = "street_to")
    Delivery toDelivery(DeliveryDto dto);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "customer", ignore = true)
    @Mapping(target = "cargos", ignore = true)
    @Mapping(target = "addressFrom.country", source = "country_from")
    @Mapping(target = "addressFrom.city", source = "city_from")
    @Mapping(target = "addressFrom.street", source = "street_from")
    @Mapping(target = "addressTo.country", source = "country_to")
    @Mapping(target = "addressTo.city", source = "city_to")
    @Mapping(target = "addressTo.street", source = "street_to")
    void mergeDelivery(DeliveryDto dto, @MappingTarget Delivery entity);


    // Offer
    @Mapping(target = "status", defaultExpression = "java(com.transportation.enums.OfferStatus.NO_CHECKED)")
    OfferDto toOfferDto(Offer entity);
    @Mapping(target = "transporter", ignore = true)
    Offer toOffer(OfferDto dto);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "transporter", ignore = true)
    void mergeOffer(OfferDto dto, @MappingTarget Offer entity);


    // Transporter
    TransporterDto toTransporterDto(Transporter entity);
    @Mapping(target = "offers", ignore = true)
    Transporter toTransporter(TransporterDto dto);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "offers", ignore = true)
    void mergeTransporter(TransporterDto dto, @MappingTarget Transporter entity);


    // User
    @Mapping(target = "role", defaultExpression = "java(com.transportation.enums.Role.CUSTOMER)")
    UserDto toUserDto(User entity);
    @Mapping(target = "role", defaultExpression = "java(com.transportation.enums.Role.CUSTOMER)")
    User toUser(ProfileDto dto);
    User toUser(UserDto dto);
    @Mapping(target = "id", ignore = true)
    void mergeUser(UserDto dto, @MappingTarget User entity);
}
