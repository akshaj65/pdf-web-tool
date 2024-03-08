import express from "express";
import { savePdfToUser, editPdfAndSend, downloadPdfFile } from "../controllers/pdfController.js";
import isAuthenticatedUser from "../middlewares/authentication.js";
import { singleUpload } from "../middlewares/multer.js";

const pdfRouter = express.Router();

//authenticated access

/**
 * POST  /api/v1/pdf/upload - upload single pdf file and save pdf data to user
 */
pdfRouter.post('/upload', isAuthenticatedUser, singleUpload, savePdfToUser);

/**
 * GET  /api/v1/pdf/:id   download a specific pdf by ID 
 */
pdfRouter.get('/download/:id', isAuthenticatedUser, downloadPdfFile);

/**
 * POST /api/v1/pdf/upload - update a specific pdf by ID
 */
pdfRouter.post('/edit/:id', isAuthenticatedUser, editPdfAndSend);


export default pdfRouter;