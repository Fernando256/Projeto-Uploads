import { Request, Response} from 'express';

export const listContent = (req: Request, res: Response) => {
    res.render('pages/list');
}