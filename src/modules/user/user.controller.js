import { User } from "../../../DB/models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Token } from "../../../DB/models/token.model.js";
import randomstring from "randomstring";
import { sendEmail } from "../../utils/sendEmail.js";
import { activateAccTemplate } from "../../utils/emailTemplates.js";

export const signup = async (req, res, next) => {
  let emailExits = await User.findOne({ email: req.body.email });
  if (emailExits) return next(new Error("Email Already Exits"));
  let phoneExits = await User.findOne({ phoneNumber: req.body.phoneNumber });
  if (phoneExits) return next(new Error("Phone Already Exits"));
  let hashedPass = bcrypt.hashSync(
    req.body.password,
    parseInt(process.env.SALT_ROUND)
  );
  await User.create({ ...req.body, password: hashedPass });

  const token = jwt.sign(
    { email: req.body.email },
    process.env.TOKEN_SECRET_KEY
  );
  let mailInfo = await sendEmail({
    to: req.body.email,
    subject: "Activate Account",
    html: activateAccTemplate(req.body.username, req.body.email, token),
  });
  if (!mailInfo) return next(new Error("Somthing Went Wrong"));

  return res.json({
    success: true,
    message: "Account Registered Successfully",
  });
};

export const activateAccount = async (req, res, next) => {
  let { token } = req.params;
  let payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  let user = await User.findOneAndUpdate(
    { email: payload.email },
    { isEmailVerified: true }
  );
  if (!user) return next(new Error("User not found"));
  res.send("Account Activated");
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) return next(new Error("Invaild Email"));
  if (!bcrypt.compareSync(password, user.password))
    return next(new Error("Invaild Password"));

  if (!user.isEmailVerified)
    return next(new Error("Activate Your Account First"));
  user.isLoggedIn = true;
  await user.save();
  let token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.TOKEN_SECRET_KEY
  );
  await Token.create({
    token,
    user: user._id,
    agent: req.headers["user-agent"],
  });
  return res.json({ success: true, message: "Logged In Successfully", token });
};

export const sendRestCode = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new Error("User Not Found"));
  const code = randomstring.generate({ length: 5, charset: "numeric" });
  user.forgetCode = code;
  await user.save();
  let mailInfo = await sendEmail({
    to: user.email,
    subject: "Reset Account Password",
    html: `<h3>Your Reset Code is ${code}</h3>`,
  });
  if (!mailInfo) return next(new Error("Somthing Went Wrong"));
  res.json({
    success: true,
    message: "Reset Code Sent To Your Email Successfully",
  });
};

export const forgetPass = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new Error("User Not Found"));
  if (user.forgetCode != req.body.resetCode)
    return next(new Error("Reset Code Is Invalid"));
  user.password = bcrypt.hashSync(
    req.body.password,
    parseInt(process.env.SALT_ROUND)
  );
  await user.save();
  const tokens = await Token.find({ user: user._id });
  tokens.forEach(async (token) => {
    token.isValid = false;
    await token.save();
  });
  res.json({
    success: true,
    message: "Your Password Reseted Successfully",
  });
};
