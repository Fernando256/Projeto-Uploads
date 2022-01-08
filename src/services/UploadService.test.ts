import { UploadInterface } from "../interfaces/UploadInterface";
import * as UploadService from './UploadService';
import { Upload } from "../models/Upload";


describe('Testing Upload Service', () => {
    beforeAll(async () => {
        await Upload.sync({ force: true });
    });

    let upload: UploadInterface = {
        title: 'Title',
        description: 'Some Description',
        idUser: 1,
        fileName: 'test.pdf',
        dateUpload: new Date(Date.now())
    }

    it('should create a new upload', async () => {
         const newUpload = await UploadService.createTopic(upload);
         expect(newUpload).toHaveProperty('id_upload');
    });
    
})