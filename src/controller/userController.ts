import express, { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/userService";
import { IUser } from "../interface/user_interface";
import { registerUserSchema, alternative } from "../libs/jwt";
import ErrorHandler from "../libs/errorHandler";
import {
    validateUserParameters,
    logInUserParameters
} from "../libs/userValidation";

export const registerUsers = async (req: Request, res: Response) => {
    console.log("Hello here")
    try {
        console.log("Hello here3", req.body);
        const { email, password, confirm_password } = req.body
        
        if (!email || !password || !confirm_password) {
          return res.status(400).json({ error: "All fields are required." });
        }

        const validatedData = validateUserParameters(req.body);
        console.log(validatedData)
        console.log("Hello here2");

    const newUser = await registerUser(validatedData);

    return res.status(200).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginUsers = async (req: Request, res: Response) => {
  try {
      const validatedUser = logInUserParameters(req.body);
      
    const User = await loginUser(validatedUser);

    return res.status(200).json({
      message: "User has login successfully",
      data: User,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
