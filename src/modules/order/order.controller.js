import { Cart } from "../../../DB/models/cart.model.js";
import { Coupons } from "../../../DB/models/coupons.model.js";
import { Order } from "../../../DB/models/order.model.js";
import { Product } from "../../../DB/models/product.model.js";
import { updateStock } from "./order.services.js";

export const createOrder = async (req, res, next) => {
  let isCoupon;
  if (req.body.coupon) {
    isCoupon = await Coupons.findOne({
      couponCode: req.body.coupon,
      expiredAt: { $gt: Date.now() },
    });
    if (!isCoupon) return next(new Error("Invaild Coupon"));
  }

  let cart = await Cart.findOne({ user: req.user._id });
  let products = cart.products;
  if (products.length < 1) return next(new Error("Empty Cart"));
  let orderProducts = [];
  let orderPrice = 0;
  for (let i = 0; i < products.length; i++) {
    let product = await Product.findById(products[i].productId);
    if (!product) return next(new Error("Product Not Found"));
    if (!product.inStock(products[i].quantity))
      return next(new Error("Product SoldOut"));

    orderProducts.push({
      name: product.name,
      quantity: products[i].quantity,
      itemPrice: product.finalPrice,
      totalPrice: product.finalPrice * products[i].quantity,
      productId: product._id,
    });
    orderPrice += product.finalPrice * products[i].quantity;
  }

  let order = await Order.create({
    ...req.body,
    user: req.user._id,
    products: orderProducts,
    price: orderPrice,
    coupon: {
      id: isCoupon?._id,
      name: isCoupon?.name,
      discount: isCoupon?.discount,
    },
  });

  updateStock(order.products, true);
  await Cart.findOneAndUpdate({ user: req.user._id }, { products: [] });

  return res.json({
    success: true,
    message: "Order Created Successfully",
  });
};

export const cancelOrder = async (req, res, next) => {
  const isOrder = await Order.findById(req.params.id);

  if (!isOrder) return next(new Error("Order Not Found"));

  if (
    isOrder.status == "shipped" ||
    isOrder.status == "delivered" ||
    isOrder.status == "canceled"
  )
    return next(new Error("You Cannot Cancel The Order"));

  isOrder.status = "canceled";
  await isOrder.save();

  updateStock(isOrder.products, false);

  return res.json({
    success: true,
    message: "Order Canceled Successfully",
  });
};
