// src/components/OrderList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderList = ({ onView }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/order/");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Orders List</h2>
      <ul>
        {orders.map((order) => (
          <li
            key={order.id}
            className="bg-gray-100 p-4 mb-4 rounded shadow flex justify-between items-center"
          >
            <span className="text-lg font-semibold">
              Order Number: {order.orderNumber}
            </span>
            <button
              onClick={() => onView(order.id)}
              className="text-blue-500 px-4 py-2 rounded bg-blue-100 hover:bg-blue-200"
            >
              View
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
