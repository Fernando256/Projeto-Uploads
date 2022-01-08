import { Request, Response } from 'express';
import { UserInterface } from '../interfaces/UserInterface';
import * as AccountService from '../services/AccountService';

export const registerUserAction = async (req: Request, res: Response) => {
    const user: UserInterface = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    if (user.name && user.email && user.password) {
        try {
            const newUser = await AccountService.createUser(user);
            if (newUser instanceof Error) 
                res.send({success: false, message: 'There is something wrong in your data, try again!'});
            else 
                res.json({success: true});            
        }catch(e) {
            console.log(e);
        }
    } else
        res.json({success: false, message: 'Somethins is empty in your register action!'});
}