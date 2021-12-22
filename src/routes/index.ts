import { Router, Request, Response } from 'express';
import * as LoginController from '../controllers/loginController';
import * as RegisterController from '../controllers/registerController';
import * as ListPageController from '../controllers/listPageController';
import * as UploadFileController from '../controllers/uploadFileController';
import * as TopicController from '../controllers/topicController';
import * as MyUploadsController from '../controllers/myUploadsController';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.redirect('/login');
});

router.get('/login', LoginController.login);
router.get('/registrar', RegisterController.registerUser);

router.get('/uploads', ListPageController.listContent);

router.get('/upload-file', UploadFileController.uploadFile);

router.get('/upload/1', TopicController.topicUpload);

router.get('/uploads/meus-uploads', MyUploadsController.myUploadsListed)

export default router;
