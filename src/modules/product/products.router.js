import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as productsController from "./products.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { isAuth } from "../../middlewares/authintication.middleware.js";

import { isAuthorized } from "../../middlewares/authorization.middleware.js";
import { uploadFiles } from "../../utils/multer.js";
import { createProductSchema, deleteProductSchema } from "./products.schema.js";

const router = Router();

router.post(
  "/",
  asyncHandler(isAuth),
  isAuthorized("seller"),
  uploadFiles().fields([{ name: "default" }, { name: "subImages" }]),
  validation(createProductSchema),
  asyncHandler(productsController.createProduct)
);


router.get(
  "/",
  asyncHandler(productsController.getProducts)
);

router.delete(
  "/:id",
  asyncHandler(isAuth),
  isAuthorized("seller"),
  validation(deleteProductSchema),
  asyncHandler(productsController.deleteproduct)
);

export default router;
