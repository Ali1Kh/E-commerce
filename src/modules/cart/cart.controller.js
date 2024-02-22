import { Cart } from "../../../DB/models/cart.model.js";
import { Product } from "../../../DB/models/product.model.js";

export const addToCart = async (req, res, next) => {
  let isProduct = await Product.findById(req.body.productId);
  if (!isProduct) return next(new Error("Product Not Found"));

  if (req.body.quantity > isProduct.quantity)
    return next(new Error("Product Sold Out"));


  await Cart.findOneAndUpdate(
    {
      user: req.user._id,
    },
    {
      $push: {
        products: {
          productId: req.body.productId,
          quantity: req.body.quantity,
        },
      },
    }
  );

  return res.json({
    success: true,
    message: "Product Added To Your Cart Successfully",
  });
};

export const updateCart = async (req, res, next) => {
  let isProduct = await Product.findById(req.body.productId);
  if (!isProduct) return next(new Error("Product Not Found"));

  if (req.body.quantity > isProduct.quantity)
    return next(new Error("Product Sold Out"));

  await Cart.findOneAndUpdate(
    {
      user: req.user._id,
      "products.productId": req.body.productId,
    },
    { "products.$.quantity": req.body.quantity }
  );
  return res.json({
    success: true,
    message: "Cart Updated Successfully",
  });
};

export const getUserCart = async (req, res, next) => {
  if (req.user.role == "user") {
    let cart = await Cart.findOne({ user: req.user._id });
    return res.json({
      success: true,
      cart,
    });
  }
  if (req.user.role == "admin" && !req.body.cartId) {
    return next(new Error("Cart Id Is Required"));
  }
  const cart = await Cart.findById(req.body.cartId);
  return res.json({
    success: true,
    cart,
  });
};

export const removeFromCart = async (req, res, next) => {
  let isProduct = await Product.findById(req.body.productId);
  if (!isProduct) return next(new Error("Product Not Found"));

  await Cart.findOneAndUpdate(
    {
      user: req.user._id,
    },
    { $pull: { products: { productId: req.body.productId } } }
  );
  return res.json({
    success: true,
    message: "Product Removed From Cart Successfully",
  });
};

export const clearCart = async (req, res, next) => {
  await Cart.findOneAndUpdate(
    {
      user: req.user._id,
    },
    {
      products: [],
    }
  );
  return res.json({
    success: true,
    message: "Cart Cleared Successfully",
  });
};
