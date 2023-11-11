// src/pages/OrderPage.jsx
import React, { useState } from "react";
import OrderList from "../components/OrderList";
import OrderForm from "../components/OrderForm";

const OrderPage = () => {
  const [viewOrderId, setViewOrderId] = useState(null);

  const handleView = (orderId) => {
    setViewOrderId(orderId);
  };

  const handleBack = () => {
    setViewOrderId(null);
  };

  return (
    <div className="p-4">
      {viewOrderId ? (
        <OrderForm onCancel={handleBack} orderId={viewOrderId} />
      ) : (
        <OrderList onView={handleView} />
      )}
    </div>
  );
};

export default OrderPage;
