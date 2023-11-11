// src/components/DeliveryList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const DeliveryList = ({ onEditStatus, onEdit, onDelete }) => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/deliveries");
        setDeliveries(response.data);
      } catch (error) {
        console.error("Error fetching deliveries:", error);
      }
    };

    fetchDeliveries();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Deliveries List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Delivery ID</th>
            <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Date & Time</th>
            <th className="py-2 px-4 border-b">Delivered</th>
            <th className="py-2 px-4 border-b">Cost</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.deliveryId}>
              <td className="py-2 px-4 border-b">{delivery.deliveryId}</td>
              <td className="py-2 px-4 border-b">{delivery.userId}</td>
              <td className="py-2 px-4 border-b">{delivery.orderId}</td>
              <td className="py-2 px-4 border-b">{delivery.deliveryAddress}</td>
              <td className="py-2 px-4 border-b">{delivery.dateTime}</td>
              <td className="py-2 px-4 border-b">{delivery.isDelivered ? "Yes" : "No"}</td>
              <td className="py-2 px-4 border-b">{delivery.deliveryCost}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => onEditStatus(delivery.deliveryId, !delivery.isDelivered)} className={`text-${delivery.isDelivered ? 'green' : 'orange'}-500 mr-2`}>
                  {delivery.isDelivered ? "Undo" : "Mark Delivered"}
                </button>
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