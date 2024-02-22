import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as couponsController from "./cart.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { isAuth } from "../../middlewares/authintication.middleware.js";

import { isAuthorized } from "../../middlewares/authorization.middleware.js";
import { addToCartSchema, getUserCartSchema, removeFromCartSchema, updateCartSchema } from "./cart.schema.js";

const router = Router();

router.post(
  "/",
  asyncHandler(isAuth),
  isAuthorized("user"),
  validation(addToCartSchema),
  asyncHandler(couponsController.addToCart)
);

router.patch(
  "/",
  asyncHandler(isAuth),
  isAuthorized("user"),
  validation(updateCartSchema),
  asyncHandler(couponsController.updateCart)
);

router.get(
  "/",
  asyncHandler(isAuth),
  isAuthorized("user", "admin"),
  validation(getUserCartSchema),
  asyncHandler(couponsController.getUserCart)
);

router.patch(
  "/removeFromCart",
  asyncHandler(isAuth),
  isAuthorized("user"),
  validation(removeFromCartSchema),
  asyncHandler(couponsController.removeFromCart)
);

router.put(
  "/",
  asyncHandler(isAuth),
  isAuthorized("user"),
  asyncHandler(couponsController.clearCart)
);

export default router;
