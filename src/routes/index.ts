import { Router, Request, Response } from 'express';
import * as LoginController from '../controllers/loginController';
import * as RegisterController from '../controllers/registerController';
import * as ListPageController from '../controllers/listPageController';
import * as UploadFileController from '../controllers/uploadFileController';
import * as TopicController from '../controllers/topicController';
import * as MyUploadsController from '../controllers/myUploadsController';
import { privateRoute } from '../config/passport';
import { upload } from '../middlewares/upload';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.redirect('/login');
});

router.get('/login', LoginController.loginPage);
router.post('/login', LoginController.loginAction);

router.get('/registrar', RegisterController.registerUserPage);
router.post('/registrar', RegisterController.registerUserAction);

router.get('/uploads', privateRoute, ListPageController.listContent);

router.get('/upload-file' ,UploadFileController.uploadFilePage);
router.post('/upload-file', privateRoute, upload.single('upload-file') ,UploadFileController.uploadFormFile);

router.get('/upload/1', privateRoute,TopicController.topicUpload);

router.get('/uploads/meus-uploads', privateRoute, MyUploadsController.myUploadsListed);

export default router;
