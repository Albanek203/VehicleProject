package com.transportation.dto;

import com.transportation.enums.OfferStatus;
import lombok.Data;

@Data
public class OfferDto {
    private Long id;
    private String description;
    private OfferStatus status;
    private DeliveryShortDto delivery;
    private TransporterShortDto transporter;
}
