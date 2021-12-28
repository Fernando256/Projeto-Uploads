import { Request, Response} from 'express';
import axios from 'axios';

export const listContent = async (req: Request, res: Response) => {
    let { user }= req; 
    console.log(user);
    res.render('pages/list-page');
}