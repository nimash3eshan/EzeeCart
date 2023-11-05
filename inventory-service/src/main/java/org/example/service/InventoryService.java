package org.example.service;

import org.example.dto.*;
import org.example.exception.InsufficientStockException;
import org.example.exception.ProductNotFoundException;
import org.example.model.Inventory;
import org.example.repository.InventoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    public Inventory addNewProduct(ProductCreateDTO productCreateDTO) {
        Inventory inventory = Inventory.builder()
                .productName(productCreateDTO.getProductName())
                .stockQuantity(productCreateDTO.getStockQuantity())
                .description(productCreateDTO.getDescription())
                .price(productCreateDTO.getPrice())
                .build();
        Inventory newProd = inventoryRepository.save(inventory);
        return newProd;
    }

    public ProductResponseDTO getProductDetailsByName(String productName) {
        Inventory inventory = inventoryRepository.findInventoryByProductName(productName);
        if(inventory == null){
            throw new IllegalArgumentException("Product not Found");
        }

        ProductResponseDTO productResponse = new ProductResponseDTO();
        productResponse.setId(inventory.getProductID());
        productResponse.setProductName(inventory.getProductName());
        productResponse.setDescription(inventory.getDescription());
        productResponse.setUnitPrice(inventory.getPrice());
        productResponse.setStockQuantity(inventory.getStockQuantity());

        return  productResponse;
    }

    public ProductResponseDTO updateProductByProductID(
            Long productID ,
            ProductUpdateDTO productUpdateDTO) {
        Inventory existingProduct = inventoryRepository.findById(productID).orElseThrow(
                () -> new IllegalArgumentException("Product not Found")
        );
        existingProduct.setProductName(productUpdateDTO.getProductName());
        existingProduct.setStockQuantity(productUpdateDTO.getStockQuantity());
        existingProduct.setPrice(productUpdateDTO.getUnitPrice());
        existingProduct.setDescription(productUpdateDTO.getDescription());
        Inventory updatedInventory = inventoryRepository.save(existingProduct);

        ProductResponseDTO productResponseDTO = new ProductResponseDTO();
        productResponseDTO.setId(updatedInventory.getProductID());
        productResponseDTO.setProductName(updatedInventory.getProductName());
        productResponseDTO.setDescription(updatedInventory.getDescription());
        productResponseDTO.setStockQuantity(updatedInventory.getStockQuantity());
        productResponseDTO.setUnitPrice(updatedInventory.getPrice());

        return productResponseDTO;
    }

    public String deleteProductByName(String productName) {
        Inventory existingProduct = inventoryRepository.findInventoryByProductName(productName);
        if(existingProduct == null){
            throw new IllegalArgumentException("Product not Found");
        }
        inventoryRepository.delete(existingProduct);
        return "Product deleted successfully";
    }

    public List<ProductResponseDTO> getAllProducts() {
        List<Inventory> products = inventoryRepository.findAll();

        List<ProductResponseDTO> productResponseDTOs = new ArrayList<>();

        for (Inventory product : products) {
            ProductResponseDTO productResponseDTO = new ProductResponseDTO();
            productResponseDTO.setProductName(product.getProductName());
            productResponseDTO.setId(product.getProductID());
            productResponseDTO.setStockQuantity(product.getStockQuantity());
            productResponseDTO.setUnitPrice(product.getPrice());
            productResponseDTO.setDescription(product.getDescription());
            productResponseDTOs.add(productResponseDTO);
        }

        return productResponseDTOs;
    }

    public ProductResponseDTO getProductByProductID(Long productID) {
        Inventory inventory = inventoryRepository.findById(productID).orElseThrow(
                () -> new ProductNotFoundException("Product is not found with ID " + productID)
        );

        ProductResponseDTO productResponseDTO = new ProductResponseDTO();
        productResponseDTO.setId(inventory.getProductID());
        productResponseDTO.setProductName(inventory.getProductName());
        productResponseDTO.setStockQuantity(inventory.getStockQuantity());
        productResponseDTO.setDescription(inventory.getDescription());
        productResponseDTO.setUnitPrice(inventory.getPrice());

        return productResponseDTO;
    }

    @Transactional
    public void deductProductQuantity(Long productID, int quantityToDeduct) {
        Inventory inventory = inventoryRepository.findById(productID).orElseThrow(
                () -> new ProductNotFoundException("Product not found with productID : " + productID)
        );
        if (quantityToDeduct > inventory.getStockQuantity()) {
            throw new InsufficientStockException("Insufficient stock for productID : " + productID);
        }
        inventory.setStockQuantity(inventory.getStockQuantity() - quantityToDeduct);
        inventoryRepository.save(inventory);
    }
}
