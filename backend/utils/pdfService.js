import CustomError from "../errors/custom-error.js";
import Pdf from "../models/pdfModel.js";
import { PDFDocument, range } from 'pdf-lib';
import fs from 'fs/promises';

export const getPdf = async (pdfId) => {
    const pdfFile = await Pdf.findById(pdfId);

    if (!pdfFile) {
        throw new CustomError.NotFoundError("File not found.");
    }
    return pdfFile;
}

export const editAndUploadPdf = async (fullFilePath, numArray) => {

    try {

        //load the file
        const existingPdfBytes = await fs.readFile(fullFilePath);

        if (!existingPdfBytes) {
            throw new CustomError.BadRequestError('Error while reading the file');
        }

        const srcPdfDoc = await PDFDocument.load(existingPdfBytes);


        // Check if the last of numArray is not greater than the number of loaded pages.
        const totalPages = srcPdfDoc.getPages().length - 1;
        const lastPageIndex = numArray.length - 1;

        if (numArray[lastPageIndex] > totalPages) {
            throw new CustomError.BadRequestError('Array Index greater than total pages of the file.');
        }


        //create a pdf with copy of the selected index from the loaded pdf
        const newPdfDoc = await PDFDocument.create();

        const copiedPages = await newPdfDoc.copyPages(srcPdfDoc, numArray);

        copiedPages.forEach((page) => {
            newPdfDoc.addPage(page);
        })
        const newPdfBytes = await newPdfDoc.save();

        //update the loaded file with the new edited
        await fs.writeFile(fullFilePath, newPdfBytes);

    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new CustomError.NotFoundError('File not found!');
        }
        throw new CustomError.InternalServerError("An error occurred while editing the file: " + (error.message || ""));
    }

}