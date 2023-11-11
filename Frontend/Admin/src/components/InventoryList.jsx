// src/components/InventoryList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryList = ({ onEdit, onDelete, onUpdate }) => {
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    

    fetchInventory();
  }, [onUpdate]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inventory List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Stock Quantity</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.productName}</td>
              <td className="py-2 px-4 border-b">{item.description}</td>
              <td className="py-2 px-4 border-b">{item.unitPrice || "-"}</td>
              <td className="py-2 px-4 border-b">{item.stockQuantity}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => onEdit(item.id)}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-500"
                >
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

export default InventoryList;
