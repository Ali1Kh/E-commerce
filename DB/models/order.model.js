import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema({
  products: [
    {
      productId: { type: Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      name:String,
      itemPrice:Number,
      totalPrice:Number
    },
  ],
  address: { type: String, required: true },
  payment: {
    type: String,
    default: "cash",
    enum: ["cash", "visa"],
  },
  phone: { type: String, required: true },
  price: { type: String, required: true },
  coupon: {
    id: { type: Types.ObjectId, ref: "Coupon" },
    name: String,
    discount: { type: Number, min: 1, max: 100 },
  },
  status: {
    type: String,
    default: "placed",
    enum: ["placed", "shipped", "delivered", "canceled"],
  },
  user: { type: Types.ObjectId, ref: "User", required: true },
});

export const Order = model("Order", orderSchema);
