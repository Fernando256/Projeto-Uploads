import { Request, Response} from 'express';

export const topicUpload = (req: Request, res: Response) => {
    res.render('pages/topic');
}
