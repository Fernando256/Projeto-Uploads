import { Request, Response} from 'express';

export const uploadFile = (req: Request, res: Response) => {
    res.render('pages/upload-page');
}
