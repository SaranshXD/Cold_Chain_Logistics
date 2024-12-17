import React, { useState, useEffect } from "react";
import axios from "axios";

const InventoryDashboard = () => {
  let token = localStorage.getItem("token");
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    expirationDate: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add inventory item
  const handleAddInventory = async () => {
    token = localStorage.getItem("token");
    if (formData.itemName && formData.quantity && formData.expirationDate) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/invdata/inventory",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert(response.data.message);

        // Validate and update the state with the new item
        if (
          response.data.newInventory &&
          response.data.newInventory.itemName &&
          response.data.newInventory.quantity &&
          response.data.newInventory.expirationDate
        ) {
          setInventory((prevInventory) => [
            ...prevInventory,
            response.data.newInventory,
          ]);
        }
        fetchInventory();

        setFormData({ itemName: "", quantity: "", expirationDate: "" });
      } catch (error) {
        console.error("Error adding inventory:", error);
        alert("Failed to add inventory item. Please try again.");
      }
    }
  };

  // Fetch inventory items
  const fetchInventory = async () => {
    try {
      token = localStorage.getItem("token");
      console.log(token)
      const response = await axios.get(
        "http://localhost:5000/api/invdata/inventory",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Validate response data
      const validInventory = Array.isArray(response.data)
        ? response.data.filter(
            (item) =>
              item &&
              typeof item.itemName === "string" &&
              typeof item.quantity !== "undefined" &&
              typeof item.expirationDate === "string"
          )
        : [];
      setInventory(validInventory);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      alert("Failed to fetch inventory. Please try again later.");
    }
  };

  // Fetch inventory on component mount
  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 p-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow-lg mb-10">
        <h1 className="text-3xl font-bold">Cold Chain Logistics Dashboard</h1>
        <p className="text-sm align-text-center mt-2">
          Efficiently manage your perishable goods inventory and operations.
        </p>
      </header>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Inventory */}
        <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-blue-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Add Inventory
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Item Name
              </label>
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="Enter item name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                placeholder="Enter quantity"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiration Date
              </label>
              <input
                type="date"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              />
            </div>
            <button
              type="button"
              onClick={handleAddInventory}
              className="flex w-auto bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all justifyContent:center"
            >
              Add Item
            </button>
          </form>
        </div>

        {/* Inventory Levels */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-xl border-t-4 border-green-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Inventory Levels
          </h2>
          {inventory.length > 0 ? (
            <table className="w-full table-auto text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-medium text-gray-600">
                    Item Name
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-600">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-600">
                    Expiration Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {item?.itemName || "Unnamed Item"}
                    </td>
                    <td className="px-6 py-4">
                      {item?.quantity || "Unknown"}
                    </td>
                    <td className="px-6 py-4">
                      {item?.expirationDate || "No Date"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 text-center py-6">
              No inventory added yet. Start by adding new items.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
