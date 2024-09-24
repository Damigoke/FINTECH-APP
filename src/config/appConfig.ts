import dotenv from "dotenv";

dotenv.config()

export const PORT = process.env.PORT as string
export const DB_URL = String(process.env.DB_URL);
export const jwtsecret = process.env.JWT_SECRET as string;