// src/components/DeliveryForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const DeliveryForm = ({ onSave, onCancel, deliveryId, onUpdate  }) => {
  const [formData, setFormData] = useState({
    userId: "",
    orderId: "",
    deliveryAddress: "",
    dateTime: "",
    isDelivered: false,
    deliveryCost: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (deliveryId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/deliveries/?deliveryId=${deliveryId}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching delivery:", error);
        }
      }
    };

    fetchData();
  }, [deliveryId]);

  const handleStatusChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      isDelivered: e.target.checked,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (deliveryId) {
        await axios.put(
          `http://localhost:8080/api/deliveries?deliveryId=${deliveryId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:8080/api/deliveries", formData);
      }

      onUpdate();
      
      onSave();
    } catch (error) {
      console.error("Error saving delivery:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-6">
        {deliveryId ? "Edit" : "Add"} Delivery
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">User ID</label>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Order ID</label>
        <input
          type="text"
          name="orderId"
          value={formData.orderId}
          onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
        <input
          type="text"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Date & Time</label>
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Is Delivered</label>
        <input
          type="checkbox"
          name="isDelivered"
          checked={formData.isDelivered}
          onChange={handleStatusChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium         text-gray-700">Delivery Cost</label>
        <input
          type="number"
          name="deliveryCost"
          value={formData.deliveryCost}
          onChange={(e) => setFormData({ ...formData, deliveryCost: e.target.value })}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={handleSubmit}
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
    </div>
  );
};

export default DeliveryForm;

