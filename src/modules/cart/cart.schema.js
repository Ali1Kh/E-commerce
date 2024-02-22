import { ObjectIdValidate } from "../../middlewares/validation.middleware.js";
import joi from "joi";

export const addToCartSchema = joi
  .object({
    productId: joi.custom(ObjectIdValidate).required(),
    quantity: joi.number().min(1).required(),
  })
  .required();

export const getUserCartSchema = joi
  .object({
    cartId: joi.custom(ObjectIdValidate),
  })
  .required();

export const updateCartSchema = joi
  .object({
    productId: joi.custom(ObjectIdValidate).required(),
    quantity: joi.number().min(1).required(),
  })
  .required();

export const removeFromCartSchema = joi
  .object({
    productId: joi.custom(ObjectIdValidate).required(),
  })
  .required();
