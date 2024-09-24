"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserParameters = validateUserParameters;
exports.logInUserParameters = logInUserParameters;
const jwt_1 = require("../libs/jwt");
function validateUserParameters(data) {
    const resultValidation = jwt_1.registerUserSchema.validate(data, jwt_1.alternative);
    if (resultValidation.error) {
        const errorMessage = resultValidation.error.details[0].message;
        throw new Error(errorMessage);
    }
    // No need for a return statement here
    return resultValidation.value;
}
function logInUserParameters(data) {
    const resultValidations = jwt_1.loginSchema.validate(data, jwt_1.alternative);
    if (resultValidations.error) {
        const errorMessage = resultValidations.error.details[0].message;
        throw new Error(errorMessage);
    }
    return resultValidations.value;
}
