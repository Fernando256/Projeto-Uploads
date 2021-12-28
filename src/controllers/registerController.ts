import { Request, Response} from 'express';
import * as AccountService from '../services/AccountService';

export const registerUserPage = (req: Request, res: Response) => {
    res.render('pages/register');
}

export const registerUserAction = async (req: Request, res: Response) => {
    let { name, email, password } = req.body;
    if (name && email && password) {
        try {
            const newUser = await AccountService.createUser(name, email, password);
            if (newUser instanceof Error) 
                res.send({success: false, message: 'Something is wrong in your data, try again!'});
            else 
                res.json({success: true});            
        }catch(e) {
            console.log('Algo deu errado: ', e);
        }
    } else
        res.redirect('/registrar');
}