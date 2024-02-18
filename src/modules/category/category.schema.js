import { ObjectIdValidate } from "../../middlewares/validation.middleware.js";
import joi from "joi";
export const createCategorySchema = joi
  .object({
    name: joi.string().required(),
    addedBy: joi.custom(ObjectIdValidate).required(),
  })
  .required();

export const updateCategorySchema = joi
  .object({
    id: joi.custom(ObjectIdValidate).required(),
    name: joi.string(),
  })
  .required();

  export const deleteCategorySchema = joi
  .object({
    id: joi.custom(ObjectIdValidate).required(),
  })
  .required();