package org.example.controller;

import org.example.dto.*;
import org.example.exception.InsufficientStockException;
import org.example.exception.ProductNotFoundException;
import org.example.model.Inventory;
import org.example.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;
    private static final Logger log = LoggerFactory.getLogger(InventoryController.class);

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Inventory addNewProduct(@RequestBody ProductCreateDTO productCreateDTO){
        return inventoryService.addNewProduct(productCreateDTO);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponseDTO> getAllProducts(){
        return inventoryService.getAllProducts();
    }

    @GetMapping("/")
    public ProductResponseDTO getProductByProductID(@RequestParam(name = "productid") Long productID) {
        return inventoryService.getProductByProductID(productID);
    }


    @PutMapping("/")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponseDTO updateProductByProductID(@RequestParam(name = "productid") Long productID, @RequestBody ProductUpdateDTO productUpdateDTO) {
        return inventoryService.updateProductByProductID(productID, productUpdateDTO);
    }


    @PutMapping("/quan-deduction")
    public ResponseEntity<String> deductProductQuantity(
            @RequestParam(name = "productid") Long productID,
            @RequestParam(name = "quantityToDeduct") int quantityToDeduct) {
        try {
            inventoryService.deductProductQuantity(productID, quantityToDeduct);
            return ResponseEntity.ok("Quantity deducted successfully.");
        } catch (ProductNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
        } catch (InsufficientStockException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient stock. Deduction not possible.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error occurred.");
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<String> validateProduct(
            @RequestParam(name = "productid") Long productID,
            @RequestParam(name = "quantityToDeduct") int quantityToDeduct) {
        try {
            inventoryService.validateProduct(productID, quantityToDeduct);
            return ResponseEntity.ok("Product validation successful.");
        } catch (ProductNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
        } catch (InsufficientStockException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient stock. Validation failed.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid quantity. Validation failed.");
        } catch (Exception e) {
            log.error("Internal server error occurred during product validation", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error occurred.");
        }
    }

    @DeleteMapping("/{productName}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteProductByName(@PathVariable String productName){
        return inventoryService.deleteProductByName(productName);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteProductById(@RequestParam(name = "productid") Long productID) {
        try {
            log.info("Received delete request for product with ID: {}", productID);
            inventoryService.deleteProductById(productID);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (ProductNotFoundException e) {
            log.error("Product not found with ID: {}", productID);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
        } catch (Exception e) {
            log.error("Internal server error occurred while deleting product with ID: {}", productID, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error occurred.");
        }
    }
}
