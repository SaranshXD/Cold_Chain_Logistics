import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    route: {
      geometry: { type: String, required: true },  // Polyline encoded route geometry
      summary: {
        duration: { type: Number, required: true },
        distance: { type: Number, required: true },
      },
    },
    createdAt: { type: Date, default: Date.now },
  });
  
  const Route = mongoose.model("Route", routeSchema);

  export default Route;
  //dqwdq