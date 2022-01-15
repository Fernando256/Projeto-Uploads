import { UploadInterface } from "../interfaces/UploadInterface";
import { UserInterface } from "../interfaces/UserInterface";
import * as UploadService from './UploadService';
import * as AccountService  from './AccountService';
import { sequelize } from "../instances/mysql";

describe('Testing Upload Service', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true}).catch((error) => {
            console.log(error);
        });  
    });

    let upload: UploadInterface = {
        title: 'Title',
        description: 'Some Description',
        idUser: 1,
        fileName: 'test.pdf',
        dateUpload: new Date(Date.now())
    }
    let user: UserInterface = {
        name: 'Test',
        email: 'teste@teste.com',
        password: 'abc1234'
    }

    it('should create a new upload', async () => {
        await AccountService.createUser(user);
        const newUpload = await UploadService.createTopic(upload);
        expect(newUpload).toHaveProperty('id_upload');
    });

    afterAll(async ()=> {
        await sequelize.drop();
    })
    
})