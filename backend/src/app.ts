// Imports
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import morgan from "morgan";
import express from "express";

// App Router
import appRouter from "./routes";

// Express setup
export const app = express();

// Express Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin: "*",
    credentials: true
}));

// Routes
app.use("/api", appRouter);