import express from "express";
import morgan from "morgan";
import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// 1. Middlewares
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

// app.use(express.static())
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3. Refactored Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);

export default app;
