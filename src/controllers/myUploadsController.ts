import { Request, Response} from 'express';
import { PaginationInterface } from '../interfaces/PaginationInterface';
import { UserInterface } from '../interfaces/UserInterface';
import * as ListUploads from '../services/ListUploadsService';

export const myUploadsListed = async (req: Request, res: Response) => {
    let user = req.user as UserInterface;
    let pagination: PaginationInterface = {
        limit: 10,
        offset: 0
    }
    const uploads = await ListUploads.listAllUploadsByUser(user.id_user, pagination);

    res.json({userId: user.id_user, uploads});
}
