import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    quantity: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "userData", required: true }, // Link to the user
  });

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
//wqdqwd