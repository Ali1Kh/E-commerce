import { Schema, Types, model } from "mongoose";

const couponsSchema = new Schema({
  couponCode: { type: String, required: true },
  couponDiscount: { type: Number, min: 1, max: 100, required: true },
  expiredAt: { type: Number, required: true },
  addedBy: { type: Types.ObjectId, ref: "User", required: true },
});

export const Coupons = model("Coupons", couponsSchema);
