import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as brandsController from "./brand.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { isAuthorized } from "../../middlewares/authorization.middleware.js";
import { isAuth } from "../../middlewares/authintication.middleware.js";
import { uploadFiles } from "../../utils/multer.js";
import {
  createBrandSchema,
  deleteBrandSchema,
  updateBrandSchema,
} from "./brand.schema.js";
const router = Router();

router.post(
  "/",
  asyncHandler(isAuth),
  isAuthorized("admin"),
  uploadFiles().single("brandImg"),
  validation(createBrandSchema),
  asyncHandler(brandsController.createBrand)
);

router.patch(
  "/:id",
  asyncHandler(isAuth),
  isAuthorized("admin"),
  uploadFiles().single("brandImg"),
  validation(updateBrandSchema),
  asyncHandler(brandsController.updateBrand)
);

router.delete(
  "/:id",
  asyncHandler(isAuth),
  isAuthorized("admin"),
  validation(deleteBrandSchema),
  asyncHandler(brandsController.deleteBrand)
);

router.get("/", asyncHandler(brandsController.getBrands));

export default router;
