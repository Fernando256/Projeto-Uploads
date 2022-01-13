import  { Upload }  from "../models/Upload";
import { UploadInterface } from "../interfaces/UploadInterface";

export const createTopic = async (upload: UploadInterface) => {
    try {
        return (await Upload.create({
            title: upload.title,
            description: upload.description,
            date_upload: upload.dateUpload,
            file_name: upload.fileName,
            id_user: upload.idUser
        }));
    }catch(e) {
        console.log(e);
        return new Error('There is something wrong with upload!');
    } 
}
