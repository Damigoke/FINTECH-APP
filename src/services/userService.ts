import express, { Request, Response, NextFunction } from "express";
import { userModel } from "../model/userModel";
import { IUser, ILogInUser } from "../interface/user_interface";
import {
  GenerateSalt,
  comparePasswords,
  encryptedPassword,
  generateToken,
} from "../libs/jwt";
import ErrorHandlers from "../libs/errorHandler";

export async function registerUser(data: IUser) {
    const existingUser = await userModel.findOne({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new ErrorHandlers("Email already exists", 400);
    }
  const salt = await GenerateSalt();

    const hashedPassword = await encryptedPassword(data.password, salt);
    console.log(hashedPassword)

        try {
        const newUser = await userModel.create({
            email: data.email,
            password: hashedPassword,
        });
            console.log("User created:", newUser);
            return newUser;
        } catch (error) {
        console.error("Error creating user:", error);
        }
    
    console.log("Email:");
    console.log("Password:");
    console.log("Confirm Password:");
}

export async function loginUser(data: ILogInUser) {
  const user = await userModel
    .findOne({ email: data.email });

  if (!user) {
    throw new ErrorHandlers("User not found", 404);
  }

  const passwordsMatch = await comparePasswords(data.password, user.password);

  if (!passwordsMatch) {
    throw new ErrorHandlers("Invalid password", 400);
  }

  const token = await generateToken(user);

  return { user, token };
}