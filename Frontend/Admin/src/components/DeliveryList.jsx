// src/components/DeliveryList.jsx
import React, { useState, useEffect } from "react";

const sampleDeliveries = [
  {
    deliveryId: 1,
    orderId: "ORD123",
    customerId: "CUST456",
    address: "123 Main St, Cityville",
    deliveryFee: 5.0,
    total: 50.0,
    status: "Delivered",
  },
  {
    deliveryId: 2,
    orderId: "ORD789",
    customerId: "CUST101",
    address: "456 Oak St, Townsville",
    deliveryFee: 3.0,
    total: 30.0,
    status: "Pending",
  },
];

const DeliveryList = ({ onEdit, onDelete, onUpdate }) => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    // Fetch delivery data and update state
    // For this dummy example, we'll use the sample data
    setDeliveries(sampleDeliveries);
  }, [onUpdate]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Delivery List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Delivery ID</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Customer ID</th>
            <th className="py-2 px-4 border-b">Delivery Fee</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.deliveryId}>
              <td className="py-2 px-4 border-b">{delivery.orderId}</td>
              <td className="py-2 px-4 border-b">{delivery.deliveryId}</td>
              <td className="py-2 px-4 border-b">{delivery.address}</td>
              <td className="py-2 px-4 border-b">{delivery.customerId}</td>
              <td className="py-2 px-4 border-b">{delivery.deliveryFee}</td>
              <td className="py-2 px-4 border-b">{delivery.total}</td>
              <td className="py-2 px-4 border-b">{delivery.status}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => onEdit(delivery.deliveryId)} className="text-blue-500 mr-2">
                  Edit
                </button>
                <button onClick={() => onDelete(delivery.deliveryId)} className="text-red-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryList;
