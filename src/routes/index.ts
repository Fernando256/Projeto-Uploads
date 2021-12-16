import { Router, Request, Response } from 'express';
import * as LoginController from '../controllers/loginController';
import * as RegisterController from '../controllers/registerController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.redirect('/login');
});

router.get('/login', LoginController.login);
router.get('/registrar', RegisterController.registerUser);

export default router;
