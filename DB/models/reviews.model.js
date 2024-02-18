import { Schema, Types, model } from "mongoose";

const reviewsSchema = new Schema({
  comment: { type: String, required: true },
  rate: { type: String, min: 0, max: 5, required: true },
  user: { type: Types.ObjectId, ref: "User", required: true },
});

export const Review = model("Review", reviewsSchema);
