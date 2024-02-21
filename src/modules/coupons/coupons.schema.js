import { ObjectIdValidate } from "../../middlewares/validation.middleware.js";
import joi from "joi";

export const addCouponSchema = joi
  .object({
    couponDiscount: joi.number().integer().min(0).max(100).required(),
    expiredAt: joi.date().greater(Date.now()).required(),
  })
  .required();

export const updateCouponSchema = joi
  .object({
    id:joi.custom(ObjectIdValidate).required(),
    couponDiscount: joi.number().integer().min(0).max(100).required(),
    expiredAt: joi.date().greater(Date.now()).required(),
  })
  .required();

  export const deleteCouponSchema = joi
  .object({
    id:joi.custom(ObjectIdValidate).required(),
  })
  .required();