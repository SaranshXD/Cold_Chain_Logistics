import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline";  // Import the polyline decoding library

const PlanRoute = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [routes, setRoutes] = useState([]);  // State to hold multiple routes
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);  // State to store selected route
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "5b3ce3597851110001cf6248abe66e3c075046e7a29867e79f988212";  // Replace with your OpenRouteService API Key
  const mapRef = useRef(null);
  const [leafletMap, setLeafletMap] = useState(null);  // Renamed to leafletMap

  useEffect(() => {
    const mapInstance = L.map(mapRef.current).setView([37.7749, -122.4194], 10); // Default center
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapInstance);
    setLeafletMap(mapInstance);  // Store the map instance in leafletMap

    return () => mapInstance.remove();
  }, []);

  const handlePlanRoute = async () => {
    if (!startLocation || !endLocation) {
      setErrorMessage("Please provide both starting and ending locations.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    // Ensure that the map is initialized before continuing
    if (!leafletMap) {
      setErrorMessage("Map is not initialized yet.");
      setLoading(false);
      return;
    }

    try {
      // Function to geocode location to coordinates
      const geocode = async (location) => {
        const response = await axios.get(
          `https://api.openrouteservice.org/geocode/search?text=${encodeURIComponent(location)}`,
          { headers: { Authorization: apiKey } }
        );
        console.log(`Geocode Response for ${location}:`, response.data);
        if (response.data.features.length > 0) {
          const [lng, lat] = response.data.features[0].geometry.coordinates;
          return { lat, lng };
        }
        throw new Error(`Could not geocode location: ${location}`);
      };

      // Get coordinates for start and end locations
      const startCoords = await geocode(startLocation);
      const endCoords = await geocode(endLocation);

      console.log("Start Coordinates:", startCoords);
      console.log("End Coordinates:", endCoords);

      if (!startCoords || !endCoords) {
        setErrorMessage("Invalid coordinates, please check the entered locations.");
        setLoading(false);
        return;
      }

      // Make the request to the route API to get the route between the two points
      const routeResponse = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        {
          coordinates: [
            [startCoords.lng, startCoords.lat],
            [endCoords.lng, endCoords.lat],
          ],
          options: {
            // Removed the 'alternative_routes' parameter
          },
        },
        {
          headers: { Authorization: apiKey },
        }
      );

      console.log("Route API Response:", routeResponse.data);

      if (routeResponse.data.routes && routeResponse.data.routes.length > 0) {
        setRoutes(routeResponse.data.routes);  // Store multiple routes

        // Clear existing routes from the map before adding new ones
        leafletMap.eachLayer((layer) => {
          if (layer instanceof L.Polyline) {
            leafletMap.removeLayer(layer);
          }
        });

        // Draw all routes, but don't set the map view yet
        routeResponse.data.routes.forEach((routeData, index) => {
          const coordinates = polyline.decode(routeData.geometry);

          console.log(`Decoded Coordinates for Route ${index + 1}:`, coordinates);

          // Draw each route on the map with a unique color
          const routeLine = L.polyline(coordinates, {
            color: index === 0 ? "blue" : index === 1 ? "green" : "red",
            weight: 5,
          }).addTo(leafletMap);

          // Store each route's line in a layer for later reference
          routeLine.routeIndex = index;  // Store index for later selection
        });

        setLoading(false);
      } else {
        setErrorMessage("No route found. Please try different locations.");
      }
    } catch (error) {
      console.error("Error planning route:", error.response ? error.response.data : error);
      setErrorMessage("Could not plan route. Please try again.");
      setLoading(false);
    }
  };

  const handleRouteSelection = (index) => {
    setSelectedRouteIndex(index);  // Update the selected route index

    // Remove all existing layers
    leafletMap.eachLayer((layer) => {
      if (layer instanceof L.Polyline) {
        leafletMap.removeLayer(layer);
      }
    });

    // Draw only the selected route
    const selectedRoute = routes[index];
    const coordinates = polyline.decode(selectedRoute.geometry);

    const routeLine = L.polyline(coordinates, {
      color: "blue",  // Use blue for selected route
      weight: 5,
    }).addTo(leafletMap);

    leafletMap.fitBounds(routeLine.getBounds());  // Fit the map to show the selected route
  };

  return (
    <div style={{ marginTop: "100px", height: "110vh" }} className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 flex flex-col items-center p-6 sm:p-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 to-blue-500 text-white w-full max-w-4xl p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-4xl font-bold text-center">Plan Optimized Route</h1>
        <p className="text-lg text-center mt-2">Generate efficient transportation routes based on starting and ending locations.</p>
      </header>

      {/* Input Section */}
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Route Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Starting Location</label>
            <input
              type="text"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              placeholder="e.g., New York, NY"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ending Location</label>
            <input
              type="text"
              value={endLocation}
              onChange={(e) => setEndLocation(e.target.value)}
              placeholder="e.g., Boston, MA"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 shadow-sm"
            />
          </div>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Route Map</h2>
        <div ref={mapRef} style={{ width: "100%", height: "500px" }}></div>
      </div>

      <button
        style={{ position: "absolute", bottom: "-150px", marginTop: "150px" }}
        onClick={handlePlanRoute}
        className="w-auto bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
      >
        {loading ? "Planning Route..." : "Plan Route"}
      </button>

      {/* Route Summary and Selection */}
      {routes.length > 0 && (
        <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Route Summary</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Route</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={(e) => handleRouteSelection(parseInt(e.target.value))}
              value={selectedRouteIndex !== null ? selectedRouteIndex : ""}
            >
              <option value="">Select a route</option>
              {routes.map((routeData, index) => (
                <option key={index} value={index}>
                  Route {index + 1} - {Math.round(routeData.summary.duration / 60)} minutes - {(routeData.summary.distance / 1000).toFixed(2)} km
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanRoute;
