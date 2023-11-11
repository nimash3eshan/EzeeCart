import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { Header } from "../components";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ["Add", "Edit", "Delete", "Cancel", "Save"];
  const editing = { allowAdding: true, allowDeleting: true, allowEditing: true };

  useEffect(() => {
    // Fetch inventory data on component mount
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/inventory");
      setInventoryData(response.data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  const actionFailure = (e) => {
    console.error("Error performing CRUD operation:", e.error);
  };

  const dataStateChange = (e) => {
    if (e.action && (e.action === "add" || e.action === "edit" || e.action === "delete")) {
      // Perform CRUD operations based on the action
      performCRUDOperation(e);
    }
  };

  const performCRUDOperation = async (event) => {
    const { requestType, data } = event;
    try {
      switch (requestType) {
        case "insert":
          await axios.post("http://localhost:8080/api/inventory", data);
          break;
        case "update":
          await axios.put(`http://localhost:8080/api/inventory/?productid=${data.id}`, data);
          break;
        case "delete":
          await axios.delete(`http://localhost:8080/api/inventory/delete?productID=${data.id}`);
          break;
        default:
          break;
      }
      // Fetch updated inventory data after CRUD operation
      fetchInventoryData();
    } catch (error) {
      console.error(`Error performing ${requestType} operation:`, error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-4 md:p-10 bg-white rounded-lg shadow-md">
      <Header category="Page" title="Inventory" />
      <GridComponent
        dataSource={inventoryData}
        enableHover={true}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
        actionFailure={actionFailure}
        dataStateChange={dataStateChange}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="productName"
            headerText="Product Name"
            isPrimaryKey={true}
            width="150"
          />
          <ColumnDirective field="description" headerText="Description" width="200" />
          <ColumnDirective field="price" headerText="Price" width="100" />
          <ColumnDirective field="stockQuantity" headerText="Stock Quantity" width="150" />
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Inventory;
