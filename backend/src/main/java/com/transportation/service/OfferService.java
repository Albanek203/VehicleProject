package com.transportation.service;

import com.transportation.dto.OfferDto;
import com.transportation.entity.Offer;
import com.transportation.entity.Transporter;
import com.transportation.entity.User;
import com.transportation.exception.EntityNotFoundException;
import com.transportation.exception.ReferenceNotFoundException;
import com.transportation.mapper.Mapper;
import com.transportation.repository.OfferRepository;
import com.transportation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class OfferService {
    private final OfferRepository offerRepository;
    private final TransporterService transporterService;
    private final UserRepository userRepository;
    private final Mapper mapper;

    public Page<OfferDto> getAll(Long id, String description, String status, Long deliveryId, Long transporterId, String searchTerm, Pageable pageable) {
        return offerRepository.findAllBy(id, description, status, deliveryId, transporterId, searchTerm, pageable).map(mapper::toOfferDto);
    }

    public OfferDto get(Long id) {
        return mapper.toOfferDto(retrieve(id));
    }

    public OfferDto create(OfferDto dto, String userEmail) {
        Offer offer = new Offer();
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ReferenceNotFoundException("User", userEmail));
        Transporter transporter = transporterService.getTransporterByUserId(user.getId());
        mapper.mergeOffer(dto, offer);
        offer.setTransporter(transporter);
        return mapper.toOfferDto(offerRepository.save(offer));
    }

    public OfferDto update(Long id, OfferDto dto, String userEmail) {
        Offer offer = retrieve(id);
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new ReferenceNotFoundException("User", userEmail));
        Transporter transporter = transporterService.getTransporterByUserId(user.getId());
        mapper.mergeOffer(dto, offer);
        offer.setTransporter(transporter);
        return mapper.toOfferDto(offerRepository.save(offer));
    }

    public void delete(Long id) {
        offerRepository.deleteById(id);
    }

    private Offer retrieve(Long id) {
        return offerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Offer", id));
    }
}
