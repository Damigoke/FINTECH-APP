"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewTransaction = createNewTransaction;
exports.viewAllTransaction = viewAllTransaction;
exports.viewOneTransaction = viewOneTransaction;
const errorHandler_1 = __importDefault(require("../libs/errorHandler"));
const transactionModel_1 = __importDefault(require("../model/transactionModel"));
async function createNewTransaction(data) {
    try {
        const newTransaction = await transactionModel_1.default.create({
            amount: data.amount,
            recipient_account_number: data.recipient_account_number,
            sender_account_number: data.sender_account_number,
            description: data.description
        });
        return newTransaction;
    }
    catch (error) {
        console.error("Error creating user:", error);
    }
}
async function viewAllTransaction() {
    const transaction = await transactionModel_1.default.find();
    if (!transaction) {
        throw new errorHandler_1.default("Payment Transaction not found", 404);
    }
    return transaction;
}
async function viewOneTransaction(Id) {
    const transaction = await transactionModel_1.default.findOne({ _id: Id });
    if (!transaction) {
        throw new errorHandler_1.default(`Payment Transaction ${Id} not found`, 404);
    }
    return transaction;
}
