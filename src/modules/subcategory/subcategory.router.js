import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as categoryController from "./subcategory.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { isAuthorized } from "../../middlewares/authorization.middleware.js";
import { isAuth } from "../../middlewares/authintication.middleware.js";
import { uploadFiles } from "../../utils/multer.js";
import {
  createSubCategorySchema,
  deleteSubCategorySchema,
  updateSubCategorySchema,
} from "./subcategory.schema.js";
const router = Router();

router.post(
  "/",
  asyncHandler(isAuth),
  isAuthorized("admin"),
  uploadFiles().single("subCategoryImg"),
  validation(createSubCategorySchema),
  asyncHandler(categoryController.createSubCategory)
);

router.patch(
  "/:id",
  asyncHandler(isAuth),
  isAuthorized("admin"),
  uploadFiles().single("subCategoryImg"),
  validation(updateSubCategorySchema),
  asyncHandler(categoryController.updateSubCategory)
);

router.delete(
  "/:id",
  asyncHandler(isAuth),
  isAuthorized("admin"),
  validation(deleteSubCategorySchema),
  asyncHandler(categoryController.deleteSubCategory)
);

router.get("/", asyncHandler(categoryController.getSubCategories));

export default router;
