import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import authRouter from './routes/authRoutes.js';

const app = express();

let corsOptions ={
    origin: 'http://localhost:3000', // React app's origin
    credentials: true,
}

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//routers
app.use('/api/v1/auth',authRouter);

app.use(errorHandlerMiddleware);

export default app;