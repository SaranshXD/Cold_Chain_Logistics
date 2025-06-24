import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  items: [
    {
      itemName: { type: String, required: true },
      quantity: { type: Number, required: true },
      status: { type: String, default: "Pending" },
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "userData", required: true },
  status: { type: String, default: "Pending" },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
//wqdq