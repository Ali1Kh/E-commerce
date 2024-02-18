import { ObjectIdValidate } from "../../middlewares/validation.middleware.js";
import joi from "joi";

export const createBrandSchema = joi
  .object({
    name: joi.string().required(),
    category: joi.custom(ObjectIdValidate).required(),
    subCategory: joi.custom(ObjectIdValidate).required(),
    addedBy: joi.custom(ObjectIdValidate).required(),
  })
  .required();

export const updateBrandSchema = joi
  .object({
    id: joi.custom(ObjectIdValidate).required(),
    name: joi.string(),
  })
  .required();

export const deleteBrandSchema = joi
  .object({
    id: joi.custom(ObjectIdValidate).required(),
  })
  .required();
