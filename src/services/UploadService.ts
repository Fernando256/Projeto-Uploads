import { Upload } from "../models/Upload";

export interface UploadInstance {
    title: string,
    description: string,
    extensionType: string,
    dateUpload: Date,
    idUser: number
}

export const createTopic = async (upload: UploadInstance) => {
    try {
        const newTopic = await Upload.create({
            title: upload.title,
            description: upload.description,
            date_upload: upload.dateUpload,
            ext_archive: upload.extensionType,
            id_user: upload.idUser
        });
        return newTopic;
    }catch(e) {
        console.log(e);
        return new Error('There is something wrong with upload!');
    } 
}