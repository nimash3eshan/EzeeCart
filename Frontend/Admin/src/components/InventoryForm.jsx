// src/components/InventoryForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryForm = ({ onSave, onCancel, productId }) => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: 0,
    stockQuantity: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        try {
          const response = await axios.get(
            `http://localhost:8082/api/inventory/?productid=${productId}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching inventory item:", error);
        }
      }
    };

    fetchData();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (productId) {
        await axios.put(
          `http://localhost:8080/api/inventory/?productid=${productId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:8080/api/inventory", formData);
      }

      setFormData({
        productName: "",
        description: "",
        price: 0,
        stockQuantity: 0,
      });

      onSave();
    } catch (error) {
      console.error("Error saving inventory item:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {productId ? "Edit" : "Add"} Inventory Item
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;

