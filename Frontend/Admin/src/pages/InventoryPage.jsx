// src/pages/InventoryPage.jsx
import React, { useState } from "react";
import InventoryList from "../components/InventoryList";
import InventoryForm from "../components/InventoryForm";

const InventoryPage = () => {
  const [editProductId, setEditProductId] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0); // Update trigger

  const handleEdit = (productId) => {
    setEditProductId(productId);
    setUpdateTrigger((prev) => prev + 1);
  };

  const handleSave = () => {
    setEditProductId(null);
    setUpdateTrigger((prev) => prev + 1);
  };

  const handleCancel = () => {
    setEditProductId(null);
  };

  const handleDelete = (productId) => {
    // Implement the delete functionality
    // Use the provided delete API endpoint
  };

  return ( 
    <div className="flex p-4 space-x-4">
      <div className="flex-2">
        <InventoryList
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUpdate={updateTrigger}
        />
      </div>
      <div className="flex-1">
        <InventoryForm
          onSave={handleSave}
          onCancel={handleCancel}
          productId={editProductId}
        />
      </div>
    </div>
  );
};

export default InventoryPage;
