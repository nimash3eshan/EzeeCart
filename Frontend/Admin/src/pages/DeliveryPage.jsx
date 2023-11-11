// src/pages/DeliveryPage.jsx
import React, { useState } from "react";
import DeliveryList from "../components/DeliveryList";
import DeliveryForm from "../components/DeliveryForm";

const DeliveryPage = () => {
  const [editDeliveryId, setEditDeliveryId] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0); // Update trigger

  const handleEdit = (deliveryId) => {
    setEditDeliveryId(deliveryId);
    setUpdateTrigger((prev) => prev + 1);
  };

  const handleSave = () => {
    setEditDeliveryId(null);
    setUpdateTrigger((prev) => prev + 1);
  };

  const handleCancel = () => {
    setEditDeliveryId(null);
  };

  const handleDelete = (deliveryId) => {
    // Implement the delete functionality
    // Use the provided delete API endpoint
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <DeliveryList onEdit={handleEdit} onDelete={handleDelete} onUpdate={updateTrigger} />
        <DeliveryForm onSave={handleSave} onCancel={handleCancel} deliveryId={editDeliveryId} />
      </div>
    </div>
  );
};

export default DeliveryPage;
