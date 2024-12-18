import React, { useState } from "react";
import axios from "axios";

const MonitorConditions = () => {
  const [orderId, setOrderId] = useState("");
  const [conditions, setConditions] = useState(null);
  const [thresholdStatus, setThresholdStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch real-time conditions for the given orderId
  const fetchConditions = async () => {
    if (!orderId) {
      alert("Please enter a valid Order ID.");
      return;
    }

    setLoading(true);
    console.log(orderId)
    try {
      const response = await axios.get(`http://localhost:5000/api/invdata/conditions/${orderId}`,
        {
            headers: {
              "Content-Type": "application/json",
            },
        }
      );
      setConditions(response.data);
      setThresholdStatus(null); // Reset threshold status
    } catch (error) {
      console.error("Error fetching conditions:", error);
      alert("Failed to retrieve conditions. Please check the Order ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check if conditions meet safe thresholds
  const checkThresholds = async () => {
    if (!conditions) {
      alert("Please fetch the conditions first.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/invdata/threshold`, {
        orderId,
        tempMin: 2, // Example thresholds
        tempMax: 8,
        humMin: 40,
        humMax: 60,
      });

      setThresholdStatus(response.data);
    } catch (error) {
      console.error("Error checking thresholds:", error);
      alert("Failed to check thresholds.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 p-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow-lg mb-10">
        <h1 className="text-3xl font-bold">Monitor Order Conditions</h1>
        <p className="text-sm mt-2">
          Enter your Order ID to track the real-time conditions of your perishable goods.
        </p>
      </header>

      {/* Main Content */}
      <div className="bg-white p-8 rounded-xl shadow-xl border-t-4 border-blue-500">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Track Order Conditions</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          />
          <button style={{width:'auto', position:'absolute',left:'35vw'}}
            type="button"
            onClick={fetchConditions}
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            {loading ? "Loading..." : "Fetch Conditions"}
          </button>

          {conditions && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Order ID: {conditions.orderId}</h3>
              <p>Temperature: {conditions.temperature}°C</p>
              <p>Humidity: {conditions.humidity}%</p>
              <p>Timestamp: {new Date(conditions.timestamp).toLocaleString()}</p>
              <p>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    conditions.isWithinThreshold ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {conditions.isWithinThreshold ? "Within Safe Range" : "Out of Range"}
                </span>
              </p>
            </div>
          )}

          <button style={{width:'auto', position:'absolute',right:'35vw'}}
            type="button"
            onClick={checkThresholds}
            className="mt-4  bg-gradient-to-r from-red-500 to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Check Thresholds
          </button>

          {thresholdStatus && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Threshold Status</h3>
              <p>{thresholdStatus.message}</p>
              <p>Temperature: {thresholdStatus.temperature}°C</p>
              <p>Humidity: {thresholdStatus.humidity}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonitorConditions;
