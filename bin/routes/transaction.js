"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const transactionController_1 = require("../controller/transactionController");
const router = express_1.default.Router();
router.post("/create", auth_1.auth, transactionController_1.newTransaction);
router.get("/views", auth_1.auth, transactionController_1.viewTransaction);
router.get("/views/:id", auth_1.auth, transactionController_1.viewSingleTransaction);
exports.default = router;
