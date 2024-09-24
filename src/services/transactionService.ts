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
import { Itransaction } from "../interface/transaction_interface";
import transactionModel from "../model/transactionModel";

export async function createNewTransaction(data: Itransaction) {
  try {
    const newTransaction = await transactionModel.create({
      amount: data.amount,
      recipient_account_number: data.recipient_account_number,
      sender_account_number: data.sender_account_number,
      description: data.description
    });
      
    return newTransaction;
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export async function viewAllTransaction() {
  const transaction = await transactionModel.find();

  if (!transaction) {
    throw new ErrorHandlers("Payment Transaction not found", 404);
  }

  return transaction;
}

export async function viewOneTransaction(Id: string) {
  const transaction = await transactionModel.findOne({ _id: Id });
  if (!transaction) {
    throw new ErrorHandlers(`Payment Transaction ${Id} not found`, 404);
  }

  return transaction;
}
