import express, { Request, Response, NextFunction } from "express";
import { createNewTransaction, viewAllTransaction, viewOneTransaction } from "../services/transactionService";
import { Itransaction } from "../interface/transaction_interface";
import { newTransactionSchema, alternative } from "../libs/jwt";
import ErrorHandler from "../libs/errorHandler";
import { validateTransactionParameters } from "../libs/transactionValidation";


export const newTransaction = async (req: Request, res: Response) => {
  console.log("Hello here");
  try {

    const validatedData = validateTransactionParameters(req.body);

    const transaction = await createNewTransaction(validatedData);

    return res.status(200).json({
      message: "Transaction has been created successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export const viewTransaction = async (req: Request, res: Response) => {
  try {
     
       const transaction = await viewAllTransaction();

    return res.status(200).json({
      message: "Transaction retrieved ",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const viewSingleTransaction = async (req: Request, res: Response) => {
  console.log("Hello here");
    const Id = req.params.id;
    console.log(Id);
  try {
    
      const transaction = await viewOneTransaction(Id);


    return res.status(200).json({
      message: `Transaction with the ${Id} retrieved`,
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};