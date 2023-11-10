package com.ezeecart.orderservice.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@AllArgsConstructor
@Data
public class CustomException {
    private final String message;
    private final HttpStatus httpStatus;
    private final ZonedDateTime timestamp;
}

