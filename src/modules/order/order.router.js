import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as orderController from "./order.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { isAuth } from "../../middlewares/authintication.middleware.js";

import { isAuthorized } from "../../middlewares/authorization.middleware.js";
import { cancelOrderSchema, createOrderSchema } from "./order.schema.js";

const router = Router();

router.post(
  "/",
  asyncHandler(isAuth),
  isAuthorized("user"),
  validation(createOrderSchema),
  asyncHandler(orderController.createOrder)
);

router.patch(
  "/:id",
  asyncHandler(isAuth),
  isAuthorized("user"),
  validation(cancelOrderSchema),
  asyncHandler(orderController.cancelOrder)
);

export default router;
