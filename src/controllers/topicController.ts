import { Request, Response } from 'express';
import { CommentInterface } from '../interfaces/CommentInterface';
import { UserInterface } from '../interfaces/UserInterface';
import * as TopicService from '../services/TopicService';

export const topicUploadPage = async (req: Request, res: Response) => {
    let user = req.user as UserInterface;
    let idUpload = parseInt(req.params.idUpload);

    if (idUpload) {
        const topic = await TopicService.listTopic(idUpload);
        if (topic) {
            let commentTopic = await TopicService.listCommentTopic(idUpload);
            res.json({userId: user.id_user, uploadTopic: topic, comments: commentTopic});
        } else
            res.json({success: false, message: 'Topic is not found!'});
    } else
        res.json({success: false, message: 'Id Upload is not valid!'});
    
}

export const addComment = async (req: Request, res: Response) => {
    let user = req.user as UserInterface;
    let commentStructure: CommentInterface = {
        comment: req.body.comment,
        idUser: user.id_user as number,
        idUpload: parseInt(req.params.idUpload)
    }
    try {
        const newComment = await TopicService.addTopicComment(commentStructure);
        if (!(newComment instanceof Error))
            res.json({success: true, comment: commentStructure});
        else
            res.json({success: false, message: newComment.message});
    }catch(e) {
        console.log(e);
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    let user = req.user as UserInterface;
    let comment: CommentInterface= {
        idComment: parseInt(req.params.idComment),
        idUser: user.id_user as number
    }
    try {
        const removeComment = await TopicService.deleteTopicComment(comment);
        if (removeComment instanceof Error)
            res.json({success: false, message: removeComment.message});
        else
            res.json({success: true});
    }catch(e) {
        console.log(e);
    }
}

export const editComment = async (req: Request, res: Response) => {
    const user = req.user as UserInterface;
    let comment: CommentInterface = {
        idComment: parseInt(req.params.idComment),
        idUser: user.id_user as number,
        comment: req.body.editComment,
    }
    try {
        const updateComment = await TopicService.editTopicComment(comment);
        if (updateComment instanceof Error)
            res.json({success: false, message: updateComment.message});
        else
            res.json({success: true, updateComment});
    }catch(e) {
        console.log(e);
    }
}
