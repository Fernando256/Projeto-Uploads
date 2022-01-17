import multer from "multer";

const fieldSize = 200000000;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/files');
    },
    filename: (req, file, cb) => {
        let extensionName = file.originalname.substring(file.originalname.lastIndexOf('.'));
        let uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + extensionName);
    }
}); 

export const upload = multer({
    storage,
    limits: { fieldSize }
});

