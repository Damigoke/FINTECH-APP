"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSingleTransaction = exports.viewTransaction = exports.newTransaction = void 0;
const transactionService_1 = require("../services/transactionService");
const transactionValidation_1 = require("../libs/transactionValidation");
const newTransaction = async (req, res) => {
    console.log("Hello here");
    try {
        const validatedData = (0, transactionValidation_1.validateTransactionParameters)(req.body);
        const transaction = await (0, transactionService_1.createNewTransaction)(validatedData);
        return res.status(200).json({
            message: "Transaction has been created successfully",
            data: transaction,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.newTransaction = newTransaction;
const viewTransaction = async (req, res) => {
    try {
        const transaction = await (0, transactionService_1.viewAllTransaction)();
        return res.status(200).json({
            message: "Transaction retrieved ",
            data: transaction,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.viewTransaction = viewTransaction;
const viewSingleTransaction = async (req, res) => {
    console.log("Hello here");
    const Id = req.params.id;
    console.log(Id);
    try {
        const transaction = await (0, transactionService_1.viewOneTransaction)(Id);
        return res.status(200).json({
            message: `Transaction with the ${Id} retrieved`,
            data: transaction,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.viewSingleTransaction = viewSingleTransaction;
