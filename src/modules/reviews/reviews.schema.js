import { ObjectIdValidate } from "../../middlewares/validation.middleware.js";
import joi from "joi";

export const addReviewSchema = joi
  .object({
    comment: joi.string().required(),
    rate: joi.number().min(0).max(5).required(),
  })
  .required();

export const updateReviewSchema = joi
  .object({
    id:joi.custom(ObjectIdValidate).required(),
    comment: joi.string(),
    rate: joi.number().min(0).max(5),
  })
  .required();
