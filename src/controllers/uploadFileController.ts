import { Request, Response } from 'express';
import * as UploadService from '../services/UploadService';

export const uploadFilePage = (req: Request, res: Response) => {
    res.render('pages/upload-page');
}

export const uploadFormFile = async (req: Request, res: Response) => {
    let file  = req.file as Express.Multer.File;
    let user = req.user as {
        id_user: number,
        name: string,
        email: string,
        password: string
    };

    try {
        const uploadTopic: UploadService.UploadInstance = {
            title: req.body.title,
            description: req.body.description,
            extensionType: (file.originalname.substring(file.originalname.lastIndexOf('.'))),
            dateUpload: new Date(Date.now()),
            idUser: user.id_user
        }
        const newUpload = await UploadService.createTopic(uploadTopic);
        if (!(newUpload instanceof Error)) 
            res.json({success: true});
        else
            res.send({success: false, message: 'Upload not be sended successfully!'});
    }catch(e) {
        console.log(e);
    }

}