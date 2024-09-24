"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./middleware/error");
// import accountRoute from "@/routes/account.route";
// import appointmentRoute from "@/routes/appointment.route";
// import authRoute from "@/routes/auth.route";
// import bedRoute from "@/routes/bed.route";
// import departmentRoute from "@/routes/department.route";
// import drugRoute from "@/routes/drug.route";
// import patientRoute from "@/routes/patient.route";
// import staffRoute from "@/routes/staff.route";
const appConfig_1 = require("./config/appConfig");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const transaction_1 = __importDefault(require("./routes/transaction"));
//import helmet from "helmet";
(0, dbConfig_1.default)();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["*"],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(error_1.ErrorMiddleWare);
app.use("/api/v2", userRoutes_1.default);
app.use("/api/v2", transaction_1.default);
// app.use("/api/v2/auth", authRoute);
// app.use("/api/v2/bed", bedRoute);
// app.use("/api/v2/department", departmentRoute);
// app.use("/api/v2/drug", drugRoute);
// app.use("/api/v2/patient", patientRoute);
// app.use("/api/v2/staff", staffRoute);
app.get("/", (req, res) => {
    return res.send("api started");
});
app.all("*", (req, res, next) => {
    const err = new Error(`Route: ${req.method} ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
app.listen(appConfig_1.PORT, () => {
    console.log(`listening on ${appConfig_1.PORT}`);
});
