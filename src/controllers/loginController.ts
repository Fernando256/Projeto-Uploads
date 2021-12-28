import { Request, Response} from 'express';
import * as AccountService from '../services/AccountService';
import { generateToken } from '../config/passport';

export const loginPage = (req: Request, res: Response) => {
    res.render('pages/login');
}

export const loginAction = async (req: Request, res: Response) => {
    let {email, password} = req.body;
    if (email && password) {
        const user = await AccountService.findByEmail(email);
        if (user && AccountService.matchPassword(password, user.password)){
            const token = generateToken({id: user.id_user});

            res.json({status: true, token: token});
        }else
            res.send({ success: false, message: 'Authentication failed. Passwords did not match.'});
    }
}
