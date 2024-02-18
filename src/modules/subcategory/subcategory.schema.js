import { ObjectIdValidate } from "../../middlewares/validation.middleware.js";
import joi from "joi";

export const createSubCategorySchema = joi
  .object({
    name: joi.string().required(),
    category: joi.custom(ObjectIdValidate).required(),
    addedBy: joi.custom(ObjectIdValidate).required(),
  })
  .required();

  export const updateSubCategorySchema = joi
  .object({
    id: joi.custom(ObjectIdValidate).required(),
    name: joi.string(),
  })
  .required();

  export const deleteSubCategorySchema = joi
  .object({
    id: joi.custom(ObjectIdValidate).required(),
  })
  .required();