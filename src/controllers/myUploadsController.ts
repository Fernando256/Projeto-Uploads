import { Request, Response} from 'express';

export const myUploadsListed = (req: Request, res: Response) => {
    res.render('pages/my-uploads');
}
