package org.example.service;

import org.example.dto.*;
import org.example.exception.InsufficientStockException;
import org.example.exception.ProductNotFoundException;
import org.example.model.Inventory;
import org.example.repository.InventoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    public ProductResponseDTO updateProductByProductID(
            Long productID,
            ProductUpdateDTO productUpdateDTO) {
        Inventory existingProduct = inventoryRepository.findById(productID).orElseThrow(
                () -> new IllegalArgumentException("Product not Found")
        );

        // Update only the non-null fields from ProductUpdateDTO
        if (productUpdateDTO.getProductName() != null) {
            existingProduct.setProductName(productUpdateDTO.getProductName());
        }
        if (productUpdateDTO.getStockQuantity() != null) {
            existingProduct.setStockQuantity(productUpdateDTO.getStockQuantity());
        }
        if (productUpdateDTO.getUnitPrice() != null) {
            existingProduct.setPrice(productUpdateDTO.getUnitPrice());
        }
        if (productUpdateDTO.getDescription() != null) {
            existingProduct.setDescription(productUpdateDTO.getDescription());
        }

        Inventory updatedInventory = inventoryRepository.save(existingProduct);

        // Mapping to ProductResponseDTO
        return mapInventoryToProductResponseDTO(updatedInventory);
    }

    private ProductResponseDTO mapInventoryToProductResponseDTO(Inventory inventory) {
        ProductResponseDTO productResponseDTO = new ProductResponseDTO();
        productResponseDTO.setId(inventory.getProductID());
        productResponseDTO.setProductName(inventory.getProductName());
        productResponseDTO.setDescription(inventory.getDescription());
        productResponseDTO.setStockQuantity(inventory.getStockQuantity());
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

    public String deleteProductByName(String productName) {
        Inventory existingProduct = inventoryRepository.findInventoryByProductName(productName);
        if(existingProduct == null){
            throw new IllegalArgumentException("Product not Found");
        }
        inventoryRepository.delete(existingProduct);
        return "Product deleted successfully";
    }

    @Transactional
    public void deleteProductById(Long productId) {
        log.info("Deleting product with ID: {}", productId);
        inventoryRepository.deleteByProductID(productId);
        log.info("Product with ID {} deleted successfully", productId);
    }


    @Transactional
    public void validateProduct(Long productID, int quantityToDeduct) {
        Inventory inventory = inventoryRepository.findById(productID).orElseThrow(
                () -> new ProductNotFoundException("Product not found with productID : " + productID)
        );
        if (quantityToDeduct > inventory.getStockQuantity()) {
            throw new InsufficientStockException("Insufficient stock for productID : " + productID);
        }
    }
}
