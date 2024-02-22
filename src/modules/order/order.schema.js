import { ObjectIdValidate } from "../../middlewares/validation.middleware.js";
import joi from "joi";

export const createOrderSchema = joi
  .object({
    quantity: joi.number().required(),
    phone: joi.string().required(),
    address: joi.string().required(),
    payment: joi.string().valid("cash", "visa").required(),
    coupon: joi.string(),
  })
  .required();

  export const cancelOrderSchema = joi
  .object({
    id:joi.custom(ObjectIdValidate).required(),
  })
  .required();