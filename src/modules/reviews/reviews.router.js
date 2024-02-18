import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as reviewsController from "./reviews.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { isAuth } from "../../middlewares/authintication.middleware.js";
import { addReviewSchema, updateReviewSchema } from "./reviews.schema.js";

const router = Router();

router.post(
  "/",
  asyncHandler(isAuth),
  validation(addReviewSchema),
  asyncHandler(reviewsController.addReview)
);

router.patch(
  "/:id",
  asyncHandler(isAuth),
  validation(updateReviewSchema),
  asyncHandler(reviewsController.updateReview)
);

export default router;
