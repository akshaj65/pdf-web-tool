import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import pdfRouter from './routes/pdfRoutes.js';
import { errorHandlerMiddleware } from './middlewares/error-handler.js';

const app = express();

let corsOptions ={
    origin: 'http://localhost:3000', // React app's origin
    credentials: true,
}

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(bodyParser.json()); // Middleware to parse JSON bodies

app.use(bodyParser.urlencoded({ extended: true }));

//routers
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/pdf',pdfRouter);

// app.use("/uploads", express.static("uploads"));

app.use(errorHandlerMiddleware);

export default app;