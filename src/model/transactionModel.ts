import Mongoose, { Schema, Model } from "mongoose";
import { Itransaction } from "../interface/transaction_interface";

const schema = Mongoose.Schema;

const transactionSchema: Schema = new schema({
  amount: {
    type: Number,
    required: true,
    unique: true,
  },
  recipient_account_number: {
    type: String,
    required: true,
  },
  sender_account_number: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const transactionModel: Model<Itransaction> = Mongoose.model<Itransaction>(
  "Transaction",
  transactionSchema
);

export default transactionModel;
