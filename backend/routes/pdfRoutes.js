import express from "express";
import { loadMe, login, logout, register } from "../controllers/authController.js";
import { getPdfFile, savePdfToUser,editPdfAndSend } from "../controllers/pdfController.js";
import isAuthenticatedUser from "../middlewares/authentication.js";
import { singleUpload } from "../middlewares/multer.js";

const pdfRouter = express.Router();

//authenticated access

pdfRouter.post('/upload', isAuthenticatedUser, singleUpload, savePdfToUser);

pdfRouter.get('/:id',isAuthenticatedUser,getPdfFile);

pdfRouter.post('/edit/:id',isAuthenticatedUser,editPdfAndSend);


export default pdfRouter;