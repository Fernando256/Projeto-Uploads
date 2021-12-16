import { Request, Response} from 'express';

export const login = (req: Request, res: Response) => {
    res.render('pages/login');
}