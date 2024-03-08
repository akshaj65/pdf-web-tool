import { StatusCodes } from "http-status-codes";
import CustomError from "../errors/custom-error.js";
import Pdf from "../models/pdfModel.js";
import path from 'path';
import { handleErrors } from "../middlewares/error-handler.js";
import { checkUserHasPdfId, getUser } from "../utils/userService.js";
import { editAndUploadPdf, getPdf } from "../utils/pdfService.js";




export const savePdfToUser = handleErrors(async (req, res, next) => {
    try {
        const pdfPath = req?.file?.path;
        const pdfName = req?.file?.originalname;

        if (!pdfPath || !pdfName) {
            return next(new CustomError.BadRequestError("File not found. Please ensure you are uploading a file."));
        }
        // Create a new PDF document
        const pdfDoc = new Pdf({
            fileName: pdfName,
            filePath: pdfPath,
        });

        await pdfDoc.save();

        const user = await getUser(req.user.id);

        // Add the PDF document's ID to the user's pdfs array
        user.pdfs.push({ pdfId: pdfDoc._id, fileName: pdfName });
        await user.save();

        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'PDF uploaded and associated with user',
            pdfDoc: {
                id: pdfDoc._id,
                fileName: pdfDoc.fileName
            }
        });
    } catch (error) {
        return next(new CustomError.InternalServerError(error.message || 'An error occurred while processing the file.'));
    }
});


export const getPdfFile = handleErrors(async (req, res, next) => {
    try {

        const user = await getUser(req.user.id);

        const pdfId = req.params.id;

        if (!pdfId) {
            return next(new CustomError.BadRequestError("Pdf ID param not specified"));
        }

        await checkUserHasPdfId(user, pdfId);

        const pdfFile = await getPdf(pdfId);

        const fullFilePath = path.join(process.cwd(), pdfFile.filePath);

        res.download(fullFilePath, (err) => {
            if (err) {
                return next(new CustomError.InternalServerError("Error While Downloading"));
            }
        });
    } catch (error) {
        return next(new CustomError.InternalServerError(error.message || 'An error occurred while processing the file.'));
    }
});

export const editPdfAndSend = handleErrors(async (req, res, next) => {

    const maxPagesAllowedToEdit = 10;

    const user = await getUser(req.user.id);
    const pdfId = req.params.id;
    const { pageNums } = req.body;

    if (!pdfId || !pageNums || !Array.isArray(pageNums)) {
        return next(new CustomError.BadRequestError("Missing PdfId or pageNums array"));
    }


    await checkUserHasPdfId(user, pdfId);

    if (pageNums.length == 0) {
        return next(new CustomError.BadRequestError("Please select atleast 1 page"));
    }

    //max 10 pages allowed to be present
    if (pageNums.length > maxPagesAllowedToEdit) {
        return next(new CustomError.BadRequestError(`Only ${maxPagesAllowedToEdit} pages allowed to be selected.`));
    }

    const pdfFile = await getPdf(pdfId);

    const fullFilePath = path.join(process.cwd(), pdfFile.filePath);

    await editAndUploadPdf(fullFilePath, pageNums);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'File edited successfully and saved.'
    });

});


