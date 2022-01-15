import * as TopicService from './TopicService';
import * as UploadService from './UploadService';
import * as AccountService  from './AccountService';
import { sequelize } from "../instances/mysql";
import { CommentInterface } from '../interfaces/CommentInterface';
import { UploadInterface } from "../interfaces/UploadInterface";
import { UserInterface } from "../interfaces/UserInterface";
import { CommentInstance } from '../models/Comment';



describe('Testing Topic Service', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true}).catch((error) => {
            console.log(error);
        });  
    });

    let comment: CommentInterface = {
        idUser: 1,
        comment: 'Testing Comment',
        idUpload: 1
    }
    let upload: UploadInterface = {
        title: 'Title',
        description: 'Some Description',
        idUser: 1,
        fileName: 'test.pdf',
        dateUpload: new Date(Date.now()),
        idUpload: 1
    }
    let user: UserInterface = {
        name: 'Test',
        email: 'teste@teste.com',
        password: 'abc1234'
    }

    it('should add a new Comment', async () => {
        await AccountService.createUser(user);
        await UploadService.createTopic(upload);
        const newComment = await TopicService.addTopicComment(comment);
        expect(newComment).toHaveProperty('id_comment');
        expect(newComment).not.toBeInstanceOf(Error);
    });


    it('should not add a new Comment', async () => {
        comment.idUpload = 2;
        const newComment = await TopicService.addTopicComment(comment);
        expect(newComment).not.toHaveProperty('id_comment');
        expect(newComment).toBeInstanceOf(Error);
    });

    it('should delete a comment', async () => {
        const deleteComment = await TopicService.deleteTopicComment(comment);
        expect(deleteComment).not.toHaveProperty('id_comment');
    });

    it('should update topic', async () => {
        await AccountService.createUser(user);
        await UploadService.createTopic(upload);
        const newComment = await TopicService.addTopicComment(comment) as CommentInstance;
        let anotherComment: CommentInterface = {
            idUser: newComment.id_user,
            idComment: newComment.id_comment,
            comment: newComment.comment
        };
        anotherComment.comment = 'It is another random comment';
        const editComment = await TopicService.editTopicComment(anotherComment) as CommentInstance;
        expect(editComment.comment).not.toBe(newComment.comment);
        expect(editComment.comment).toBe(anotherComment.comment);
        expect(editComment).not.toBeNull();
    })

    it('should list topic', async () => {
        const listTopic = await TopicService.listTopic(1);
        expect(listTopic).toHaveProperty('id_upload');
        expect(listTopic).not.toBeNull();
    });

    it('should list comment from topic', async () => {
        await TopicService.addTopicComment(comment);
        const listTopic = await TopicService.listTopic(1);
        expect(listTopic).not.toBeNull();
    });

    afterAll(async () => {
        await sequelize.drop();
    })
});