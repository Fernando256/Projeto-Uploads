import { Request, Response} from 'express';

export const registerUser = (req: Request, res: Response) => {
    res.render('pages/register');
}