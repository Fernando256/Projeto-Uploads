import { Request, Response } from 'express';
import { CommentInterface } from '../interfaces/CommentInterface';
import { UserInterface } from '../interfaces/UserInterface';
import * as UploadService from '../services/UploadService';

export const topicUploadPage = (req: Request, res: Response) => {
    let user = req.user as UserInterface;
    let idUpload = parseInt(req.params.idUpload);

    if (idUpload)
        res.json({userId: user.id_user});
    else
        throw new Error("Id Upload is not valid!");        
}

export const addTopicComment = async (req: Request, res: Response) => {
    let { comment } = req.body; 
    let user = req.user as UserInterface;
    let idUpload = parseInt(req.params.idUpload);

    if (comment && idUpload) {
        try {
            let commentDataToAddDataBase: CommentInterface = {
                comment,
                idUser: user.id_user,
                idUpload
            };
            const newComment = await UploadService.addTopicComment(commentDataToAddDataBase);
            if (!(newComment instanceof Error))
                res.json({success: true, comment: commentDataToAddDataBase});
            else
                res.json({success: false, message: newComment.message});


        }catch(e) {
            console.log(e);
        }
        
    } else 
        console.log("Algo deu ruim");

}

export const deleteComment = async (req: Request, res: Response) => {
    let idUpload = parseInt(req.params.idUpload);
    let idComment = parseInt(req.params.idComment);
    try {
        const removeComment = await UploadService.deleteTopicComment(idUpload, idComment);
        if (removeComment instanceof Error)
            res.json({success: false, message: removeComment.message});
        else
            res.json({success: true});
    }catch(e) {
        console.log(e);
    }
}
