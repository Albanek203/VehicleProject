package com.transportation.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ReferenceNotFoundException extends RuntimeException {
    public ReferenceNotFoundException() {
        super("Referred entity not found");
    }

    public ReferenceNotFoundException(String message) {
        super(message);
    }

    public ReferenceNotFoundException(String entityName, Long id) {
        super("Referred %s with id %d is not found".formatted(entityName, id));
    }

    public ReferenceNotFoundException(String entityName, String str) {
        super("Referred %s with id %s is not found".formatted(entityName, str));
    }
}