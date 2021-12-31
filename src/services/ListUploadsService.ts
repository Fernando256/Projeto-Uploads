import {Upload} from '../models/Upload';

export const listUploads = async (limit: number, offset: number) => {
    try {
        let listAll = await Upload.findAll({
            limit,
            offset 
        });
        return listAll;
    }catch(e) {
        console.log(e);
        return new Error('There is something wrong with uploads!');
    }
}