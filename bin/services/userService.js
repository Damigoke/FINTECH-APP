"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const userModel_1 = require("../model/userModel");
const jwt_1 = require("../libs/jwt");
const errorHandler_1 = __importDefault(require("../libs/errorHandler"));
async function registerUser(data) {
    const existingUser = await userModel_1.userModel.findOne({
        where: { email: data.email },
    });
    if (existingUser) {
        throw new errorHandler_1.default("Email already exists", 400);
    }
    const salt = await (0, jwt_1.GenerateSalt)();
    const hashedPassword = await (0, jwt_1.encryptedPassword)(data.password, salt);
    console.log(hashedPassword);
    try {
        const newUser = await userModel_1.userModel.create({
            email: data.email,
            password: hashedPassword,
        });
        console.log("User created:", newUser);
        return newUser;
    }
    catch (error) {
        console.error("Error creating user:", error);
    }
    console.log("Email:");
    console.log("Password:");
    console.log("Confirm Password:");
}
async function loginUser(data) {
    const user = await userModel_1.userModel
        .findOne({ email: data.email });
    if (!user) {
        throw new errorHandler_1.default("User not found", 404);
    }
    const passwordsMatch = await (0, jwt_1.comparePasswords)(data.password, user.password);
    if (!passwordsMatch) {
        throw new errorHandler_1.default("Invalid password", 400);
    }
    const token = await (0, jwt_1.generateToken)(user);
    return { user, token };
}
