import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as couponsController from "./coupons.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { isAuth } from "../../middlewares/authintication.middleware.js";
import { addCouponSchema, deleteCouponSchema, updateCouponSchema } from "./coupons.schema.js";
import { isAuthorized } from "../../middlewares/authorization.middleware.js";

const router = Router();

router.post(
  "/",
  asyncHandler(isAuth),
  isAuthorized("seller"),
  validation(addCouponSchema),
  asyncHandler(couponsController.addCoupon)
);

router.patch(
  "/:id",
  asyncHandler(isAuth),
  isAuthorized("seller"),
  validation(updateCouponSchema),
  asyncHandler(couponsController.updateCoupon)
);

router.delete(
  "/:id",
  asyncHandler(isAuth),
  isAuthorized("seller"),
  validation(deleteCouponSchema),
  asyncHandler(couponsController.deleteCoupon)
);

export default router;
