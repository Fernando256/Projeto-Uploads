import { Upload } from "../models/Upload";

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