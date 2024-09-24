"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsers = exports.registerUsers = void 0;
const userService_1 = require("../services/userService");
const userValidation_1 = require("../libs/userValidation");
const registerUsers = async (req, res) => {
    console.log("Hello here");
    try {
        console.log("Hello here3", req.body);
        const { email, password, confirm_password } = req.body;
        if (!email || !password || !confirm_password) {
            return res.status(400).json({ error: "All fields are required." });
        }
        const validatedData = (0, userValidation_1.validateUserParameters)(req.body);
        console.log(validatedData);
        console.log("Hello here2");
        const newUser = await (0, userService_1.registerUser)(validatedData);
        return res.status(200).json({
            message: "User created successfully",
            data: newUser,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.registerUsers = registerUsers;
const loginUsers = async (req, res) => {
    try {
        const validatedUser = (0, userValidation_1.logInUserParameters)(req.body);
        const User = await (0, userService_1.loginUser)(validatedUser);
        return res.status(200).json({
            message: "User has login successfully",
            data: User,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.loginUsers = loginUsers;
