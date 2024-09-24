"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleWare = void 0;
const errorHandler_1 = __importDefault(require("../libs/errorHandler"));
const ErrorMiddleWare = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    if (err.name === "CastError") {
        const message = `Resource not found. invalid: ${err.path}`;
        err = new errorHandler_1.default(message, 400);
    }
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new errorHandler_1.default(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is invalid. Please try again`;
        err = new errorHandler_1.default(message, 400);
    }
    if (err.name === "TokenExpiredError") {
        const message = `Json web token is expired. Please try again`;
        err = new errorHandler_1.default(message, 401);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.ErrorMiddleWare = ErrorMiddleWare;
exports.default = exports.ErrorMiddleWare;
