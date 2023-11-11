// src/pages/DeliveryPage.jsx
import React, { useState } from "react";
import DeliveryList from "../components/DeliveryList";
import DeliveryForm from "../components/DeliveryForm";
import axios from "axios";

const DeliveryPage = () => {
  const [editDeliveryId, setEditDeliveryId] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0); // Update trigger

  const handleEditStatus = async (deliveryId, isDelivered) => {
    try {
      await axios.put(
        `http://localhost:8083/api/deliveries?deliveryId=${deliveryId}`,
        { isDelivered }
      );
      setUpdateTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

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

  const handleDelete = async (deliveryId) => {
    try {
      await axios.delete(`http://localhost:8080/api/deliveries?deliveryId=${deliveryId}`);
      setUpdateTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting delivery:", error);
    }
  };

  return (
    <div className="flex p-4 space-x-4">
      <div className="flex-2">
      <DeliveryList
        onEditStatus={handleEditStatus}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUpdate={() => setUpdateTrigger((prev) => prev + 1)}
      />
      </div>
      <div className="flex-1">

      <DeliveryForm
        onSave={handleSave}
        onCancel={handleCancel}
        deliveryId={editDeliveryId}
        onUpdate={() => setUpdateTrigger((prev) => prev + 1)}

      />
      </div>
    </div>
  );
};

export default DeliveryPage;
