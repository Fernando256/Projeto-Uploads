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

router.post('/login', LoginController.loginAction);

router.post('/registrar', RegisterController.registerUserAction);

router.get('/uploads', privateRoute, ListPageController.listContent);

router.post('/upload-file', privateRoute, upload.single('upload-file') ,UploadFileController.uploadFormFile);

router.get('/upload/:idUpload', privateRoute, TopicController.topicUploadPage)
router.post('/upload/:idUpload', privateRoute, TopicController.addComment);

router.put('/upload/:idComment', privateRoute, TopicController.editComment);
router.delete('/upload/:idComment', privateRoute, TopicController.deleteComment);

router.get('/uploads/meus-uploads', privateRoute, MyUploadsController.myUploadsListed);

export default router; 
