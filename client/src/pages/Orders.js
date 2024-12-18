// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaTruck, FaClipboardList, FaCheckCircle, FaExclamationCircle, FaPlusCircle, FaTrashAlt } from "react-icons/fa";

// const OrderDashboard = () => {
//   const token = localStorage.getItem("token");
//   const [inventory, setInventory] = useState([]);
//   const [orderItems, setOrderItems] = useState([{ itemName: "", quantity: "" }]);
//   const [orderStatus, setOrderStatus] = useState("");
//   const [orderId, setOrderId] = useState("");
//   const [trackedOrder, setTrackedOrder] = useState(null);

//   // Fetch all inventory items (from all contractors)
//   const fetchInventory = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/invdata/inventory/customers", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setInventory(response.data); // Set the inventory list for dropdown
//     } catch (error) {
//       console.error("Error fetching inventory:", error);
//       alert("Failed to fetch inventory. Please try again later.");
//     }
//   };

//   // Fetch inventory when the component mounts
//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   // Handle input change for order items
//   const handleOrderInputChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedItems = [...orderItems];
//     updatedItems[index][name] = value;
//     setOrderItems(updatedItems);
//   };

//   // Add a new item input field for the order
//   const handleAddOrderItem = () => {
//     setOrderItems([...orderItems, { itemName: "", quantity: "" }]);
//   };

//   // Remove an item input field for the order
//   const handleRemoveOrderItem = (index) => {
//     const updatedItems = orderItems.filter((_, i) => i !== index);
//     setOrderItems(updatedItems);
//   };

//   // Create a new order for multiple items
//   const handleCreateOrder = async () => {
//     if (orderItems.length === 0) {
//       alert("Please add items to the order.");
//       return;
//     }

//     const items = orderItems.filter((item) => item.itemName && item.quantity);

//     if (items.length === 0) {
//       alert("Please fill in both item name and quantity for each item.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/invdata/orders",
//         { items },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setOrderStatus(`Order created successfully: ${response.data.newOrder.orderId}`);
//       setOrderId(response.data.newOrder.orderId);
//     } catch (error) {
//       console.error("Error creating order:", error);
//       setOrderStatus("Failed to create order. Please try again.");
//     }
//   };

//   // Track order status
//   const handleTrackOrder = async () => {
//     if (!orderId) {
//       alert("Please enter a valid order ID.");
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/invdata/orders/${orderId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setTrackedOrder(response.data);
//     } catch (error) {
//       console.error("Error tracking order:", error);
//       alert("Failed to retrieve order status.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 p-8">
//       {/* Header */}
//       <header className="bg-gradient-to -r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow-lg mb-10">
//         <h1 className="text-4xl font-extrabold text-center">Cold Chain Logistics</h1>
//         <p className="text-md text-center mt-2">
//           Create and track orders for your perishable goods efficiently.
//         </p>
//       </header>

//       {/* Main Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Create Order */}
//         <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-blue-500">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Order</h2>
//           <form className="space-y-6">
//             {orderItems.map((item, index) => (
//               <div key={index} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Item Name</label>
//                   <select
//                     name="itemName"
//                     value={item.itemName}
//                     onChange={(e) => handleOrderInputChange(index, e)}
//                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//                   >
//                     <option value="">Select Item</option>
//                     {inventory.map((invItem, i) => (
//                       <option key={i} value={invItem.itemName}>
//                         {invItem.itemName} (Exp: {invItem.expirationDate.slice(0, 10)})
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Quantity</label>
//                   <input
//                     type="number"
//                     name="quantity"
//                     value={item.quantity}
//                     onChange={(e) => handleOrderInputChange(index, e)}
//                     className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//                     placeholder="Enter quantity"
//                   />
//                 </div>
//                 {orderItems.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveOrderItem(index)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Remove Item
//                   </button>
//                 )}
//               </div>
//             ))}
//           </form>
//           <div className="mt-6">
//             <button
//               type="button"
//               onClick={handleAddOrderItem}
//               className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
//             >
//               <FaPlusCircle className="inline mr-2" /> Add Item
//             </button>
//             <button
//               type="button"
//               onClick={handleCreateOrder}
//               className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition ml-4"
//             >
//               <FaClipboardList className="inline mr-2" /> Create Order
//             </button>
//             {orderStatus && <p className="text-green-600 font-semibold mt-4">{orderStatus}</p>}
//           </div>
//         </div>

//         {/* Track Order */}
//         <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-green-500">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">Track Order</h2>
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Enter Order ID"
//               value={orderId}
//               onChange={(e) => setOrderId(e.target.value)}
//               className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
//             />
//             <button
//               type="button"
//               onClick={handleTrackOrder}
//               className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
//             >
//               <FaTruck className="inline mr-2" /> Track Order
//             </button>

//             {trackedOrder && (
//               <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
//                 <h3 className="text-lg font-semibold">Order ID: {trackedOrder.orderId}</h3>
//                 <p>Status: <span className="font -bold text-blue-500">{trackedOrder.status}</span></p>
//                 <ul className="mt-2">
//                   {trackedOrder.items.map((item, index) => (
//                     <li key={index} className="text-gray-700">
//                       <FaClipboardList className="inline mr-2" />
//                       {item.itemName} - {item.quantity} units
//                     </li>
//                   ))}
//                 </ul>
//                 {trackedOrder.status === "Delivered" && (
//                   <div className="mt-4 text-green-600">
//                     <FaCheckCircle className="inline mr-2" />
//                     Your order has been delivered successfully!
//                   </div>
//                 )}
//                 {trackedOrder.status === "Pending" && (
//                   <div className="mt-4 text-yellow-600">
//                     <FaExclamationCircle className="inline mr-2" />
//                     Your order is still pending. Please check back later.
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderDashboard;

























import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTruck, FaClipboardList, FaCheckCircle,FaPlusCircle, FaExclamationCircle } from "react-icons/fa";

const OrderDashboard = () => {
  let token = localStorage.getItem("token");
  const [inventory, setInventory] = useState([]);
  const [orderItems, setOrderItems] = useState([{ itemName: "", quantity: "" }]);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderId, setOrderId] = useState("");
  const [trackedOrder, setTrackedOrder] = useState(null);

  // Fetch all inventory items (from all contractors)
  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/invdata/inventory/customers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data)
      setInventory(response.data); // Set the inventory list for dropdown
    } catch (error) {
      console.error("Error fetching inventory:", error);
      alert("Failed to fetch inventory. Please try again later.");
    }
  };

  // Fetch inventory when the component mounts
  useEffect(() => {
    fetchInventory();
  }, []);

  // Handle input change for order items
  const handleOrderInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...orderItems];
    updatedItems[index][name] = value;
    setOrderItems(updatedItems);
  };

  // Add a new item input field for the order
  const handleAddOrderItem = () => {
    setOrderItems([...orderItems, { itemName: "", quantity: "" }]);
  };

  // Remove an item input field for the order
  const handleRemoveOrderItem = (index) => {
    const updatedItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedItems);
  };

  // Create a new order for multiple items
  const handleCreateOrder = async () => {
    if (orderItems.length === 0) {
      alert("Please add items to the order.");
      return;
    }

    const items = orderItems.filter((item) => item.itemName && item.quantity);

    if (items.length === 0) {
      alert("Please fill in both item name and quantity for each item.");
      return;
    }
    console.log(items)

    try {
      const response = await axios.post(
        "http://localhost:5000/api/invdata/orders",
        { items },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrderStatus(`Order created successfully: ${response.data.newOrder.orderId}`);
      setOrderId(response.data.newOrder.orderId);
    } catch (error) {
      console.error("Error creating order:", error);
      setOrderStatus("Failed to create order. Please try again.");
    }
  };

  // Track order status
  const handleTrackOrder = async () => {
    if (!orderId) {
      alert("Please enter a valid order ID.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/invdata/orders/${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrackedOrder(response.data);
    } catch (error) {
      console.error("Error tracking order:", error);
      alert("Failed to retrieve order status.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 p-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow-lg mb-10">
        <h1 className="text-3xl font-bold">Cold Chain Logistics - Order Dashboard</h1>
        <p className="text-sm align-text-center mt-2">
          Create and track orders for your perishable goods efficiently.
        </p>
      </header>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Order */}
        <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-blue-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Create Order</h2>
          <form className="space-y-6">
            {orderItems.map((item, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <div style={{display:'flex', justifyContent:'space-between'}}>
                  <label className="block text-sm font-medium text-gray-700">Item Name</label>
                  <label className="block text-sm font-medium text-gray-700">Expiration date</label>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  </div>
                  <select
                    name="itemName"
                    value={item.itemName}
                    onChange={(e) => handleOrderInputChange(index, e)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  >
                    <option value="">Select Item</option>
                    {inventory.map((invItem, i) => (
                      <option key={i} value={invItem.itemName}>
                        
                        {invItem.itemName} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ({invItem.expirationDate.slice('0','10')})&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{invItem.quantity}
                        
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleOrderInputChange(index, e)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="Enter quantity"
                  />
                </div>
                {orderItems.length > 1 && (
                  <button
                  style={{position:'absolute' ,bottom:'10px',left:'47vw', width:'auto', marginBottom: '7vh', display: 'flex', justifyContent: 'space-between', backgroundColor:'crimson', color:'white', opacity:'0.8', boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}
                    type="button"
                    onClick={() => handleRemoveOrderItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove Item
                  </button>
                )}
              </div>
            ))}
          </form>
          {orderStatus && <p className="mt-6">{orderStatus}</p>}
        </div>

        {/* Track Order */}
        <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-green-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Track Order</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
            {trackedOrder && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Order ID: {trackedOrder.orderId}</h3>
                <p> <FaExclamationCircle className="inline mr -2" /> Status: {trackedOrder.status}</p>
                <ul>
                  {trackedOrder.items.map((item, index) => (
                    <li style={{display:'flex', alignItems:'center'}} key={index} className="text-gray-700 ">
                      <FaClipboardList className="inline mr-2" />
                      {item.itemName} - {item.quantity} units
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: '10vh', marginBottom: '5vh', display: 'flex', justifyContent: 'space-between' }}>
        <button style={{display:'flex',alignItems:'center',position:'absolute' ,bottom:'5px',left:'46vw'}}
          type="button"
          onClick={handleCreateOrder}
          className="flex w-auto bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
        ><FaClipboardList className="inline mr-2" />
          Create Order
        </button>
        <button
          type="button" style={{display:'flex',alignItems:'center'}}
          onClick={handleAddOrderItem}
          className="left-10 w-auto bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
        ><FaPlusCircle className="inline mr-2" />
          Add Another Item
        </button>
        <button
          type="button"
          onClick={handleTrackOrder}
          className="right-10 w-auto bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
        >
          <FaTruck className="inline mr-2" />
          Track Order
          
        </button>
      </div>
    </div>
  );
};

export default OrderDashboard;
