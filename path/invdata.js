// Backend for Order Management
import express from "express";
import cors from "cors";
// import jwt from "jsonwebtoken";
import Inventory from "../models/inventory.js";
import authMiddleware from "../middleware/authmiddleware.js";
import Order from "../models/orders.js";
import Route from "../models/routeSchema.js"

const router = express.Router();
const app = express();

// Middleware
app.use(cors());

// Mock Data for Orders (remove if using a database)
let orders = [];

// Routes

// Add Inventory
router.post("/inventory", authMiddleware, async (req, res) => {
  try {
    const { itemName, quantity, expirationDate } = req.body;
   console.log(itemName, quantity)
   console.log(req.userId)
    const newInventory = new Inventory({
      itemName,
      quantity,
      expirationDate,
      userId: req.userId, // Associate inventory with logged-in user
    });
    console.log(newInventory)
    const savedInv = await newInventory.save();
    res.status(201).json({ message: "Inventory added successfully", savedInv });
  } catch (error) {
    res.status(500).json({ message: "Error adding inventory", error });
  }
});

// Get Inventory
router.get("/inventory", authMiddleware, async (req, res) => {
  try {
    // Fetch only inventory associated with the logged-in user
    console.log('inside get inven')
    const inventory = await Inventory.find({ userId: req.userId });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving inventory", error });
  }
});
router.get("/inventory/customers", authMiddleware, async (req, res) => {
  try {
    // Fetch only inventory associated with the logged-in user
    console.log('inside get inven')
    const inventory = await Inventory.find();
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving inventory", error });
  }
});

// Create Order for Multiple Items

// router.post("/orders", authMiddleware, async (req, res) => {
//   try {
//     const { items } = req.body; // Array of { itemName, quantity }

//     if (!Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ message: "Items are required for the order." });
//     }

//     const orderDetails = [];

//     // Process each item in the order
//     for (const { itemName, quantity } of items) {
//       if (!itemName || !quantity) {
//         return res.status(400).json({ message: "Each item must have a name and quantity." });
//       }

//       // Find the item in inventory
//       const item = await Inventory.find();
//       if (!item) {
//         return res.status(404).json({ message: `Item '${itemName}' not found in inventory.` });
//       }

//       // Check if sufficient quantity is available
//       if (item.quantity < quantity) {
//         return res.status(400).json({ message: `Insufficient quantity for item '${itemName}'.` });
//       }

//       // Deduct quantity from inventory
//       item.quantity -= quantity;
//       await item.save();

//       // Add item to order details
//       orderDetails.push({
//         itemName,
//         quantity,
//         status: "Pending",  // Initial order status
//       });
//     }

//     // Generate a unique orderId (e.g., based on timestamp or sequence)
//     const orderId = `ORD${Date.now()}`;

//     // Create a new order
//     const newOrder = new Order({
//       orderId,
//       userId: req.userId,  // Link the order to the current user
//       items: orderDetails,
//       status: "Pending",  // Default order status
//     });

//     // Save the new order to the database
//     await newOrder.save();

//     res.status(201).json({ message: "Order created successfully.", newOrder });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ message: "Error creating order", error });
//   }
// });





// Create Order for Multiple Items
router.post("/orders", authMiddleware, async (req, res) => {
  try {
    const { items } = req.body; // Array of { itemName, quantity }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required for the order." });
    }

    const allInventory = await Inventory.find(); // Fetch all inventory items
    console.log(allInventory)
    const orderDetails = [];

    // Process each item in the order
    for (const { itemName, quantity } of items) {
      if (!itemName || !quantity) {
        return res.status(400).json({ message: "Each item must have a name and quantity." });
      }

      // Find the item in inventory
      const item = allInventory.find((inv) => inv.itemName === itemName);
      if (!item) {
        return res.status(404).json({ message: `Item '${itemName}' not found in inventory.` });
      }

      // Check if sufficient quantity is available
      if (item.quantity < quantity) {
        return res.status(400).json({ message: `Insufficient quantity for item '${itemName}'.` });
      }

      // Deduct quantity from inventory
      item.quantity -= quantity;
      await Inventory.findByIdAndUpdate(item._id, { quantity: item.quantity });

      // Add item to order details
      orderDetails.push({
        itemName,
        quantity,
        status: "Pending", // Initial order status
      });
    }

    // Generate a unique orderId
    const orderId = `ORD${Date.now()}`;

    // Create a new order
    const newOrder = new Order({
      orderId,
      userId: req.userId, // Link the order to the current user
      items: orderDetails,
      status: "Pending", // Default order status
    });

    // Save the new order to the database
    await newOrder.save();

    res.status(201).json({ message: "Order created successfully.", newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order", error });
  }
});





// Track Order
router.get("/orders/:orderId", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by orderId and userId
    const order = await Order.findOne({ orderId, userId: req.userId });

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({ message: "Error retrieving order", error });
  }
});


router.get("/conditions/:orderId", async (req, res) => {
  const { orderId } = req.params;
   console.log(orderId)
  try {
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    const simulatedTemperature = (Math.random() * 4 + 4).toFixed(2); // Random temperature between 4°C to 8°C
    const simulatedHumidity = (Math.random() * 20 + 40).toFixed(2); // Random humidity between 40% to 60%

    res.json({
      orderId,
      temperature: simulatedTemperature,
      humidity: simulatedHumidity,
      timestamp: new Date(),
      isWithinThreshold:
        simulatedTemperature >= 2 &&
        simulatedTemperature <= 8 &&
        simulatedHumidity >= 40 &&
        simulatedHumidity <= 60,
    });
  } catch (error) {
    console.error("Error fetching order conditions:", error);
    res.status(500).json({ message: "Error fetching conditions." });
  }
});


router.post("/threshold", async (req, res) => {
  const { orderId, tempMin, tempMax, humMin, humMax } = req.body;

  try {
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    const simulatedTemperature = (Math.random() * 4 + 4).toFixed(2);
    const simulatedHumidity = (Math.random() * 20 + 40).toFixed(2);

    const isTemperatureOutOfRange =
      simulatedTemperature < tempMin || simulatedTemperature > tempMax;
    const isHumidityOutOfRange =
      simulatedHumidity < humMin || simulatedHumidity > humMax;

    if (isTemperatureOutOfRange || isHumidityOutOfRange) {
      return res.json({
        status: "Alert",
        message: "Conditions are out of the safe range!",
        temperature: simulatedTemperature,
        humidity: simulatedHumidity,
      });
    }

    res.json({
      status: "Normal",
      message: "Conditions are within the safe range.",
      temperature: simulatedTemperature,
      humidity: simulatedHumidity,
    });
  } catch (error) {
    console.error("Error checking thresholds:", error);
    res.status(500).json({ message: "Error checking thresholds." });
  }
});



router.post("/delivery/route", async (req, res) => {
  const { orderId, route } = req.body;

  if (!orderId || !route || !route.geometry) {
    return res.status(400).send("Order ID and route geometry are required.");
  }

  try {
    // Save the route to the database
    const newRoute = new Route({
      orderId,
      route,
    });

    await newRoute.save();
    res.status(200).send("Route successfully attached to the order.");
  } catch (error) {
    console.error("Error saving route:", error);
    res.status(500).send("Failed to save the route.");
  }
});

// Route to fetch route by order ID
router.get("/delivery/route/:orderId", async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    return res.status(400).send("Order ID is required.");
  }

  try {
    // Find the route by order ID
    const route = await Route.findOne({ orderId });

    if (!route) {
      return res.status(404).send("Route not found for the given order ID.");
    }

    res.status(200).json({ route });
  } catch (error) {
    console.error("Error fetching route:", error);
    res.status(500).send("Failed to fetch the route.");
  }
});



export default router;



//wqdq




















































// import express from "express"
// const router = express.Router()
// const app = express()
// import cors from "cors"
// import Inventory from "../models/inventory.js"
// import authMiddleware from "../middleware/authmiddleware.js"


// // const PORT = 5000;

// // Middleware
// app.use(cors());

// // app.use(bodyParser.json());

// // // MongoDB Connection
// // mongoose
// //   .connect("mongodb://127.0.0.1:27017/cold_chain_inventory", {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   })
// //   .then(() => console.log("MongoDB Connected"))
// //   .catch((err) => console.error(err));

// // Inventory Schema & Model
// // const inventorySchema = new mongoose.Schema({
// //   itemName: { type: String, required: true },
// //   quantity: { type: Number, required: true },
// //   expirationDate: { type: String, required: true },
// // });

// // const Inventory = mongoose.model("Inventory", inventorySchema);

// // Routes
// // Add Inventory
// router.post("/inventory",authMiddleware, async (req, res) => {
//   try {
//     const { itemName, quantity, expirationDate} = req.body;

//     const newInventory = new Inventory({
//       itemName,
//       quantity,
//       expirationDate,
//       userId: req.user.id, // Associate inventory with logged-in user
//     });
    
//     const savedInv = await newInventory.save();
//     res.status(201).json({ message: "Inventory added successfully", savedInv });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding inventory", error });
//   }
// });

// // Get Inventory
// router.get("/inventory",authMiddleware,async (req, res) => {
//   try {
//     // Fetch only inventory associated with the logged-in user
//     const inventory = await Inventory.find({ userId: req.user.id });
//     res.status(200).json(inventory);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving inventory", error });
//   }
// });

// // Start Server
// // app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// export default router











