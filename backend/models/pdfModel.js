import mongoose from "mongoose";

const PdfSchema = new mongoose.Schema({
    fileName: String,
    filePath: String,
});

const Pdf = new mongoose.model('Pdf', PdfSchema);

export default Pdf;
