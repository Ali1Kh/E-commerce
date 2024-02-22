import { Product } from "../../../DB/models/product.model.js";

export const updateStock = async (products, createOrder) => {
  if (createOrder) {
    for (const product of products) {
      await Product.findByIdAndUpdate(product.productId, {
        $inc: {
          soldItems: product.quantity,
          quantity: -product.quantity,
        },
      });
    }
  } else {
    for (const product of products) {
      await Product.findByIdAndUpdate(product.productId, {
        $inc: {
          soldItems: -product.quantity,
          quantity: product.quantity,
        },
      });
    }
  }
};
