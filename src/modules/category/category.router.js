import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as categoryController from "./category.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { isAuthorized } from "../../middlewares/authorization.middleware.js";
import { isAuth } from "../../middlewares/authintication.middleware.js";
import { uploadFiles } from "../../utils/multer.js";
import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from "./category.schema.js";
const router = Router();

router.post(
  "/",
  asyncHandler(isAuth),
  isAuthorized("admin"),
  uploadFiles().single("categoryImg"),
  validation(createCategorySchema),
  asyncHandler(categoryController.createCategory)
);

router.patch(
  "/:id",
  asyncHandler(isAuth),
  isAuthorized("admin"),
  uploadFiles().single("categoryImg"),
  validation(updateCategorySchema),
  asyncHandler(categoryController.updateCategory)
);

router.delete(
  "/:id",
  asyncHandler(isAuth),
  isAuthorized("admin"),
  validation(deleteCategorySchema),
  asyncHandler(categoryController.deleteCategory)
);

router.get("/", asyncHandler(categoryController.getCategories));

export default router;
