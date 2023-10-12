package org.example.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.ZonedDateTime;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(value = {ProductNotFoundException.class})
    public ResponseEntity<Object> handleUserNotFoundException(ProductNotFoundException e) {
        HttpStatus notFound = HttpStatus.NOT_FOUND;
        CustomException customException = new CustomException(
                e.getMessage(),
                notFound,
                ZonedDateTime.now()
        );
        return new ResponseEntity<>(customException, notFound);
    }

    @ExceptionHandler(value = {InsufficientStockException.class})
    public ResponseEntity<Object> handleInsufficientStockException(InsufficientStockException e) {
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;
        CustomException customException = new CustomException(
                e.getMessage(),
                badRequest,
                ZonedDateTime.now()
        );
        return new ResponseEntity<>(customException, badRequest);
    }

}
