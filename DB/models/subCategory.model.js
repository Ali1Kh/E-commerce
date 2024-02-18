import { Schema, Types, model } from "mongoose";

const subCategorySchema = new Schema({
  name: { type: String, unique: true, required: true },
  slug: { type: String, unique: true, required: true },
  image: {
    secure_url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  addedBy: { type: Types.ObjectId, ref: "User", required: true },
  category: { type: Types.ObjectId, ref: "Category", required: true },
});

export const SubCategory = model("SubCategory", subCategorySchema);
