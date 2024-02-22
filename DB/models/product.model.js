import { Schema, Types, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, min: 0, required: true },
    soldItems: { type: Number, default: 0 },
    discount: { type: Number, min: 0, max: 100, required: true },
    image: [
      {
        secure_url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    defaultImage: {
      secure_url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    addedBy: { type: Types.ObjectId, ref: "User", required: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    subCategory: { type: Types.ObjectId, ref: "SubCategory", required: true },
    brand: { type: Types.ObjectId, ref: "Brand", required: true },
    cloudFolder: { type: String, unique: true, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strictQuery: true,
  }
);

productSchema.virtual("finalPrice").get(function () {
  return Number.parseFloat(
    this.price - (this.price * this.discount || 0) / 100
  ).toFixed(2);
});

productSchema.query.paginate = function (page) {
  page = page < 1 || isNaN(page) || !page ? 1 : page;
  let limit = 2;
  let skip = limit * (page - 1);
  return this.skip(skip).limit(limit);
};

productSchema.query.search = function (key) {
  if (key) {
    return this.find({ name: { $regex: key , $options:"i"} });
  }
};

export const Product = model("Product", productSchema);
