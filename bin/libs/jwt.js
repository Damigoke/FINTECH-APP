"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.comparePasswords = exports.encryptedPassword = exports.GenerateSalt = exports.newTransactionSchema = exports.loginSchema = exports.alternative = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appConfig_1 = require("../config/appConfig");
exports.registerUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required().email(),
    password: joi_1.default.string().required(),
    confirm_password: joi_1.default.any()
        .equal(joi_1.default.ref("password"))
        .required()
        .label("confirm password"),
});
exports.alternative = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().required(),
});
exports.newTransactionSchema = joi_1.default.object().keys({
    amount: joi_1.default.number().required(),
    recipient_account_number: joi_1.default.string().required(),
    sender_account_number: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
});
const GenerateSalt = async () => {
    return await bcryptjs_1.default.genSalt();
};
exports.GenerateSalt = GenerateSalt;
const encryptedPassword = async (password, salt) => {
    return await bcryptjs_1.default.hash(password, salt);
};
exports.encryptedPassword = encryptedPassword;
const comparePasswords = async (password, hashedPassword) => {
    return await bcryptjs_1.default.compare(password, hashedPassword);
};
exports.comparePasswords = comparePasswords;
const generateToken = async (user) => {
    const payload = {
        email: user.email,
    };
    const secretKey = appConfig_1.jwtsecret;
    const options = {
        expiresIn: "30m",
    };
    return jsonwebtoken_1.default.sign(payload, secretKey, options);
};
exports.generateToken = generateToken;
