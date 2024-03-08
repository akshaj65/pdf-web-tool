import express from "express";
import {  savePdfToUser, editPdfAndSend, downloadPdfFile } from "../controllers/pdfController.js";
import isAuthenticatedUser from "../middlewares/authentication.js";
import { singleUpload } from "../middlewares/multer.js";

const pdfRouter = express.Router();

//authenticated access

/**
 * POST /pdf/upload - upload single pdf file
 */
pdfRouter.post('/upload', isAuthenticatedUser, singleUpload, savePdfToUser);
/**
 * GET  /pdf/:id   download
 */
pdfRouter.get('/download/:id', isAuthenticatedUser, downloadPdfFile);

pdfRouter.post('/edit/:id', isAuthenticatedUser, editPdfAndSend);


export default pdfRouter;