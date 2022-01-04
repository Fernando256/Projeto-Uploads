import { Upload } from "../models/Upload";
import { Comment } from '../models/Comment';
import { CommentInterface } from "../interfaces/CommentInterface";

export interface UploadInstance {
    title: string,
    description: string,
    fileName: string,
    dateUpload: Date,
    idUser: number
}

export const createTopic = async (upload: UploadInstance) => {
    try {
        const newTopic = await Upload.create({
            title: upload.title,
            description: upload.description,
            date_upload: upload.dateUpload,
            file_name: upload.fileName,
            id_user: upload.idUser
        });
        return newTopic;
    }catch(e) {
        console.log(e);
        return new Error('There is something wrong with upload!');
    } 
}

export const addTopicComment = async (comment: CommentInterface) => {
    let verifyExistsUpload = await Upload.findByPk(comment.idUpload);
    if (verifyExistsUpload) {
        try {
            const newComment = await Comment.create({
                comment: comment.comment,
                id_upload: comment.idUpload,
                id_user: comment.idUser
            });
            return newComment;
        }catch(e) {
            console.log(e);
            return new Error('There is something wrong with comment!');
        }
    } else 
        return new Error('This upload not exists.');
    
}

export const deleteTopicComment = async (idUpload: number, idComment: number) => {
    const comment = await Comment.findByPk(idComment);
    try {
        if (comment) {
            if (comment.id_upload == idUpload)
                return (await comment.destroy());
            else 
                return new Error('This upload id not equals to comment owner.');
        } else 
            return new Error('This comment not exists.');
    }catch(e) {
        console.log(e);
    }
    
}