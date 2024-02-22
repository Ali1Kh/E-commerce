import { ObjectIdValidate } from "../../middlewares/validation.middleware.js";
import joi from "joi";

export const createProductSchema = joi
  .object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    quantity: joi.number().required(),
    soldItems: joi.number().required(),
    discount: joi.number().min(0).max(100).required(),
    category: joi.custom(ObjectIdValidate).required(),
    subCategory: joi.custom(ObjectIdValidate).required(),
    brand: joi.custom(ObjectIdValidate).required(),
  })
  .required();

export const deleteProductSchema = joi
  .object({
    id: joi.custom(ObjectIdValidate).required(),
  })
  .required();
