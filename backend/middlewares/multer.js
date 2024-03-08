import multer from 'multer';
import { v4 as uuid } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const id = uuid();
        const extName = file.originalname.split(".").pop();
        cb(null, `${id}.${extName}`);
    }
});

const maxBytes = 5000000;  //5mb

export const singleUpload = multer({
    storage,
    limits: {
        fileSize: maxBytes /* bytes */ 
    }
}).single('file');

