import { Request, Response } from 'express';
import { UserInterface } from '../interfaces/UserInterface';
import * as ListUploads from '../services/ListUploadsService';

export const listContent = async (req: Request, res: Response) => {
    let user = req.user as UserInterface; 
    let limit = 10;
    let offset = 0;
    const allUploads = await ListUploads.listUploads(limit, offset);
    
    res.json({userId: user.id_user, allUploads});
}