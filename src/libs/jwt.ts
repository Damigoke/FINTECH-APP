import Joi from "joi";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { jwtsecret } from "../config/appConfig";
import { IUser } from "../interface/user_interface";

export const registerUserSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required().email(),
  password: Joi.string().required(),
  confirm_password: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("confirm password"),
});

export const alternative = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const loginSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().required(),
});

export const newTransactionSchema = Joi.object().keys({
  amount: Joi.number().required(),
  recipient_account_number: Joi.string().required(),
  sender_account_number: Joi.string().required(),
  description: Joi.string().required(),
});

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const encryptedPassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = async (user: IUser) => {
  const payload = {
    email: user.email,
  };
  const secretKey = jwtsecret;
  const options = {
    expiresIn: "30m",
  };
  return Jwt.sign(payload, secretKey, options);
};
