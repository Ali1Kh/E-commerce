import { Schema, Types, model } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      productId: { type: Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalPrice: { type: Number },
  user: { type: Types.ObjectId, ref: "User", required: true, unique: true },
});

export const Cart = model("Cart", cartSchema);
