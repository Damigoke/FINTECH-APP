"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTransactionParameters = validateTransactionParameters;
const jwt_1 = require("../libs/jwt");
function validateTransactionParameters(data) {
    const resultValidation = jwt_1.newTransactionSchema.validate(data, jwt_1.alternative);
    if (resultValidation.error) {
        const errorMessage = resultValidation.error.details[0].message;
        throw new Error(errorMessage);
    }
    return resultValidation.value;
}
