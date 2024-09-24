import { registerUserSchema, loginSchema, alternative } from "../libs/jwt";
import express, { Request, Response, NextFunction } from "express";
import { IUser, ILogInUser } from "../interface/user_interface";
import ErrorHandler from "../libs/errorHandler";

export function validateUserParameters(data: IUser) {
  const resultValidation = registerUserSchema.validate(data, alternative);

  if (resultValidation.error) {
    const errorMessage = resultValidation.error.details[0].message;
    throw new Error(errorMessage);
  }
  // No need for a return statement here
  return resultValidation.value;
}

export function logInUserParameters(data: ILogInUser) {
  const resultValidations = loginSchema.validate(data, alternative);

  if (resultValidations.error) {
    const errorMessage = resultValidations.error.details[0].message;
    throw new Error(errorMessage);
  }
  return resultValidations.value;
}