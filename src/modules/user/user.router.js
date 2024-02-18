import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as usersController from "./user.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import {
  signUpSchema,
  loginSchema,
  forgetPassSchema,
  sendRestCodeSchema,
  activateAccountSchema,
} from "./user.schema.js";
const router = Router();

router.post(
  "/signup",
  validation(signUpSchema),
  asyncHandler(usersController.signup)
);

router.get(
  "/confirmAccount/:token",
  validation(activateAccountSchema),
  asyncHandler(usersController.activateAccount)
);

router.post(
  "/login",
  validation(loginSchema),
  asyncHandler(usersController.login)
);

router.patch(
  "/resetCode",
  validation(sendRestCodeSchema),
  asyncHandler(usersController.sendRestCode)
);

router.patch(
  "/forgetPass",
  validation(forgetPassSchema),
  asyncHandler(usersController.forgetPass)
);

export default router;
