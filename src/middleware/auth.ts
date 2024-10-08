import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import userModel from "../model/userModel";
import { jwtsecret } from "../config/appConfig";


export async function auth(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ error: "Kindly Log in as a User" });
    }

    const token = authorization?.slice(7, authorization.length);

    let verified = jwt.verify(token, jwtsecret);

    if (!verified) {
      return res
        .status(401)
        .send({ error: "Token not available on this route" });
    }

    const { id } = verified as { [key: string]: string };

    //find user by id;
    const user = await userModel.findOne({ id });

    if (!user) {
      return res.status(401).send("Details not correct, Kindly sign in");
    }

    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).send("User not Loggedin");
  }
}
