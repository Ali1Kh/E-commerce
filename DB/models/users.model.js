import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNumber: { type: String, unique: true, required: true },
  address: { type: String, required: true },
  role: {
    type: String,
    required: true,
    validate(value) {
      value = value.toLowerCase();
      return value === "user" || value === "admin";
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  forgetCode: { type: String },
});

export const User = model("User", userSchema);
