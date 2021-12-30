import multer from "multer";

const fieldSize = 200000000;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files');
    },
    filename: (req, file, cb) => {
        let extensionName = file.originalname.substring(file.originalname.lastIndexOf('.'));
        
        cb(null, '1' + extensionName); // '1' will be modified to id_upload
    }
});

export const upload = multer({
    storage,
    limits: { fieldSize }
});

