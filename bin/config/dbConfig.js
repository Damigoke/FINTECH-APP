"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const appConfig_1 = require("./appConfig");
function dbConnection() {
    const database = mongoose_1.default
        .connect(appConfig_1.DB_URL)
        .then(() => {
        console.log("Database Connection Successfull");
    })
        .catch((err) => {
        console.error("Error connecting to Database:", err);
    });
    return database;
}
exports.default = dbConnection;
