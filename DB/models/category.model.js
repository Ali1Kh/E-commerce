import { Schema, Types, model } from "mongoose";
import { SubCategory } from "./subCategory.model.js";

const categorySchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    slug: { type: String, unique: true, required: true },
    image: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    addedBy: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.virtual("subcategories", {
  ref: "SubCategory",
  localField: "_id",
  foreignField: "category",
});

categorySchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await SubCategory.deleteMany({
      category: this._id,
    });
  }
);

export const Category = model("Category", categorySchema);
