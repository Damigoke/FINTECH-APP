import express from "express";
import { auth } from "../middleware/auth";
import { newTransaction, viewTransaction, viewSingleTransaction } from "../controller/transactionController";

const router = express.Router();

router.post("/create", auth, newTransaction);
router.get("/views", auth, viewTransaction);
router.get("/views/:id", auth, viewSingleTransaction);

export default router;
