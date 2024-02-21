import joi from "joi";

export const signUpSchema = joi
  .object({
    username: joi.string().required(),
    email: joi.string().email().required().messages({
      "string.email": "Please Enter Valid Email",
    }),
    password: joi
      .string()
      .min(8)
      .required()
      .pattern(new RegExp("^[A-Z].{7,30}$"))
      .messages({
        "string.pattern.base": "Password Must Start With Capital Letter",
        "string.min": "Password Must Be At least 8 characters.",
      }),
    rePassword: joi.string().valid(joi.ref("password")).required().messages({
      "any.only": "RePassword is Invaild",
    }),
    address: joi.string().required(),
    age: joi.number().required(),
    phoneNumber: joi
      .string()
      .min(11)
      .max(11)
      .pattern(new RegExp("^01[0125][0-9]{8}$"))
      .required()
      .messages({
        "string.min": "Phone Number Cannot be less than 11 Characters",
        "string.max": "Phone Number Cannot be more than 11 Characters",
        "string.pattern.base": "Please Enter Vaild Phone Number",
      }),
    role: joi.string().uppercase().valid("USER", "ADMIN","SELLER").required().messages({
      "any.only": "Role Must Be One Of (USER,ADMIN,SELLER)",
    }),
  })
  .required();

export const loginSchema = joi
  .object({
    email: joi.string().email().allow("", null).optional().messages({
      "string.email": "Please Enter Valid Email",
    }),
    password: joi.string().min(8).required().messages({
      "string.min": "Password is Invalid",
    }),
  })
  .required();

export const activateAccountSchema = joi
  .object({
    token: joi.string().required(),
  })
  .required();

export const sendRestCodeSchema = joi
  .object({
    email: joi.string().email().required().messages({
      "string.email": "Please Enter Valid Email",
    }),
  })
  .required();

export const forgetPassSchema = joi
  .object({
    email: joi.string().email().required().messages({
      "string.email": "Please Enter Valid Email",
    }),
    resetCode: joi.string().length(5).required(),
    password: joi
      .string()
      .min(8)
      .required()
      .pattern(new RegExp("^[A-Z].{7,30}$"))
      .messages({
        "string.pattern.base": "Password Must Start With Capital Letter",
        "string.min": "Password Must Be At least 8 characters.",
      }),
    confirmPassword: joi
      .string()
      .valid(joi.ref("password"))
      .required()
      .messages({
        "any.only": "Confirm Password must be Equal main password.",
      }),
  })
  .required();
