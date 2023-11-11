// src/components/OrderForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderForm = ({ onSave, onCancel, orderId }) => {
  const [formData, setFormData] = useState({
    orderNumber: "",
    orderLineItemsList: [],
    userId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (orderId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/order?orderId=${orderId}`
          );
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      }
    };

    fetchData();
  }, [orderId]);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-6">
        {orderId ? "View" : "Add"} Order
      </h2>
      <div className="mb-4">
        <p className="text-lg font-semibold">Order Number: {formData.orderNumber}</p>
        <p className="text-lg font-semibold">User ID: {formData.userId}</p>
      </div>
      <div className="mb-4">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">SKU Code</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {formData.orderLineItemsList.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.skuCode}</td>
                <td className="py-2 px-4 border-b">{item.price}</td>
                <td className="py-2 px-4 border-b">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default OrderForm;
