import { Request, Response } from 'express';
import * as UploadService from '../services/UploadService';
import { UserInterface } from '../interfaces/UserInterface';

export const uploadFilePage = (req: Request, res: Response) => {
    res.render('pages/upload-page');
}

export const uploadFormFile = async (req: Request, res: Response) => {
    let file  = req.file as Express.Multer.File;
    let user = req.user as UserInterface;

    try {
        const uploadTopic: UploadService.UploadInstance = {
            title: req.body.title,
            description: req.body.description,
            fileName: file.filename,
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