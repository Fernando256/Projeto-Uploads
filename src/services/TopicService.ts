import { Comment } from '../models/Comment';
import { CommentInterface } from "../interfaces/CommentInterface";
import { Upload } from '../models/Upload';

export const addTopicComment = async (commentToAdd: CommentInterface) => {
    let verifyExistsUpload = await Upload.findByPk(commentToAdd.idUpload);
    try {
        if (commentToAdd.comment){
            if (verifyExistsUpload) {
                return (await Comment.create({
                    comment: commentToAdd.comment,
                    id_upload: commentToAdd.idUpload,
                    id_user: commentToAdd.idUser
                }));
            } else 
                return new Error('This upload not exists.');
        } else 
            return new Error ('This comment is empty!');
  
    }catch(e) {
        console.log(e);
    }
}

export const deleteTopicComment = async (commentToDelete: CommentInterface) => {
    const comment = await Comment.findByPk(commentToDelete.idComment);
    try {
        if (comment){
            if (comment.id_user == commentToDelete.idUser)
                return (await comment.destroy());
            else
                return new Error('This user is not the comment owner!');
        } else 
            return new Error('This comment not exists.');

    }catch(e) {
        console.log(e);
    }   
}

export const editTopicComment = async (commentToUpdate: CommentInterface) => {
    const editComment = await Comment.findByPk(commentToUpdate.idComment);
    try {
        if (editComment) {
            if (commentToUpdate.idUser == editComment.id_user) {
                editComment.comment = commentToUpdate.comment as string;
                return (await editComment.save());
            } else
                return new Error('This user is not the comment owner!');
        } else
            return new Error('This comment not exists!');
    }catch(e) {
        console.log(e);
    }
}

export const listTopic = async (idUpload: number) => {
   return (await Upload.findByPk(idUpload));
}

export const listCommentTopic = async (idUpload: number) => {
    return (await Comment.findAll({
        where: {
            id_upload: idUpload
        }
    }))
}
