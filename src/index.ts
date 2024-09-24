
 import { ErrorMiddleWare } from "./middleware/error";
// import accountRoute from "@/routes/account.route";
// import appointmentRoute from "@/routes/appointment.route";
// import authRoute from "@/routes/auth.route";
// import bedRoute from "@/routes/bed.route";
// import departmentRoute from "@/routes/department.route";
// import drugRoute from "@/routes/drug.route";
// import patientRoute from "@/routes/patient.route";
// import staffRoute from "@/routes/staff.route";
import { PORT } from "./config/appConfig";
import cors from "cors";
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import express, { Express, NextFunction, Request, Response } from "express";
import dbConnection from "./config/dbConfig";
import { userModel } from "./model/userModel";
import userRoute from "./routes/userRoutes"
import transactionModel from "./model/transactionModel";
import transactionRoute from "./routes/transaction"
//import helmet from "helmet";

dbConnection()
const app: Express = express();
app.use(logger('dev'));
app.use(express.json());
app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(ErrorMiddleWare)

app.use("/api/v2", userRoute);
app.use("/api/v2", transactionRoute);
// app.use("/api/v2/auth", authRoute);
// app.use("/api/v2/bed", bedRoute);
// app.use("/api/v2/department", departmentRoute);
// app.use("/api/v2/drug", drugRoute);
// app.use("/api/v2/patient", patientRoute);
// app.use("/api/v2/staff", staffRoute);

app.get("/", (req, res) => {
  return res.send("api started");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(
    `Route: ${req.method} ${req.originalUrl} not found`
  ) as any;
  err.statusCode = 404;
  next(err);
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
