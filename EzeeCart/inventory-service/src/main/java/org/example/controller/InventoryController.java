package org.example.controller;

import org.example.dto.*;
import org.example.exception.InsufficientStockException;
import org.example.exception.ProductNotFoundException;
import org.example.model.Inventory;
import org.example.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService inventoryService;

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

    @GetMapping("/{productID}")
    public ProductResponseDTO getProductByProductID(@PathVariable(name = "productID") Long productID) {
        return inventoryService.getProductByProductID(productID);
    }

    @PutMapping("/{productID}")
    @ResponseStatus(HttpStatus.OK)
    public ProductResponseDTO updateProductByProductID(@PathVariable Long productID,@RequestBody ProductUpdateDTO productUpdateDTO){
        return inventoryService.updateProductByProductID(productID, productUpdateDTO);
    }

    @PutMapping("/{productID}/quan-deduction/{quantityToDeduct}")
    public ResponseEntity<Void> deductProductQuantity(
            @PathVariable(name = "productID") Long productID,
            @PathVariable(name = "quantityToDeduct") int quantityToDeduct){
        try {
            inventoryService.deductProductQuantity(productID, quantityToDeduct);
            return ResponseEntity.ok().build();
        } catch (ProductNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (InsufficientStockException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/{productName}")
    @ResponseStatus(HttpStatus.OK)
    public String deleteProductByName(@PathVariable String productName){
        return inventoryService.deleteProductByName(productName);
    }
}
