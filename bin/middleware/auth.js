"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const appConfig_1 = require("../config/appConfig");
async function auth(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ error: "Kindly Log in as a User" });
        }
        const token = authorization?.slice(7, authorization.length);
        let verified = jsonwebtoken_1.default.verify(token, appConfig_1.jwtsecret);
        if (!verified) {
            return res
                .status(401)
                .send({ error: "Token not available on this route" });
        }
        const { id } = verified;
        //find user by id;
        const user = await userModel_1.default.findOne({ id });
        if (!user) {
            return res.status(401).send("Details not correct, Kindly sign in");
        }
        req.user = verified;
        next();
    }
    catch (err) {
        return res.status(400).send("User not Loggedin");
    }
}
