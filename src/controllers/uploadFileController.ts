import { Request, Response} from 'express';

export const uploadFile = (req: Request, res: Response) => {
    res.render('pages/upload-page');
}

export const uploadFormFile = async (req: Request, res: Response) => {
    let {title, description} = req.body;
    let file = req.file;
    console.log('Title: ' + title);
    console.log('Description: ' + description);
    console.log(file);
    res.json({});
}