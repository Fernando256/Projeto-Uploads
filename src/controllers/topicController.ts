import { Request, Response} from 'express';
import { UserInterface } from '../interfaces/UserInterface';

export const topicUploadPage = (req: Request, res: Response) => {
    let user = req.user as UserInterface;
    let idUpload = parseInt(req.params.idUpload);

    if (idUpload)
        res.json({userId: user.id_user});
    else
        throw new Error("Id Upload is not valid!");
        
}
