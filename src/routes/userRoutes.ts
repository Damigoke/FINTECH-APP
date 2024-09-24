import { registerUsers, loginUsers } from './../controller/userController';
import express from 'express';

const router = express.Router()

router.post("/createUser", registerUsers);
router.post("/login", loginUsers)

export default router;