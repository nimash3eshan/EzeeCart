// src/components/DeliveryForm.jsx
import React, { useState, useEffect } from "react";

const DeliveryForm = ({ onSave, onCancel, deliveryId }) => {
  const [formData, setFormData] = useState({
    orderId: "",
    customerId: "",
    address: "",
    deliveryFee: 0,
    total: 0,
    status: "",
  });

  useEffect(() => {
    // Fetch data based on deliveryId (if it exists) and update formData
    // For this dummy example, we'll initialize with empty data
  }, [deliveryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the logic for saving the delivery data
    // For this dummy example, we'll just call the onSave function
    onSave();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {deliveryId ? "Edit" : "Add"} Delivery
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Order ID</label>
          <input
            type="text"
            name="orderId"
            value={formData.orderId}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Customer ID</label>
          <input
            type="text"
            name="customerId"
            value={formData.customerId}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Delivery Fee</label>
          <input
            type="number"
            name="deliveryFee"
            value={formData.deliveryFee}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Total</label>
          <input
            type="number"
            name="total"
            value={formData.total}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
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

export default DeliveryForm;
