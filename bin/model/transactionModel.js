"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = mongoose_1.default.Schema;
const transactionSchema = new schema({
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
const transactionModel = mongoose_1.default.model("Transaction", transactionSchema);
exports.default = transactionModel;
