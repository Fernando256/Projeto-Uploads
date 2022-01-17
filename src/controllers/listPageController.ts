import { Request, Response } from 'express';
import { UserInterface } from '../interfaces/UserInterface';
import * as ListUploads from '../services/ListUploadsService';

export const listContent = async (req: Request, res: Response) => {
    const UPLOADS_PER_PAGE = 10;
    let user = req.user as UserInterface;
    let numberOfPageUpload = 1;

    if (typeof req.query.pag === 'string') {
        if (parseInt(req.query.pag)) 
            numberOfPageUpload = parseInt(req.query.pag);     
    }

    let limit = UPLOADS_PER_PAGE * numberOfPageUpload;
    let offset = limit - UPLOADS_PER_PAGE;
        
    const allUploads = await ListUploads.listUploads(limit, offset);
    
    res.json({userId: user.id_user, allUploads});
}