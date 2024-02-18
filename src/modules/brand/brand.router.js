import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as categoryController from "./brand.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
const router = Router();
export default router;
