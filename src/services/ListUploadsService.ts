import { PaginationInterface } from '../interfaces/PaginationInterface';
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

export const listAllUploadsByUser = async (userId: number, pagination: PaginationInterface) => {
    try {
        let listAllByUser = await Upload.findAll({
            where: {
                id_user: userId
            },
            limit: pagination.limit,
            offset: pagination.offset
        });
        return listAllByUser;
    }catch(e) {
        console.log(e);
        return new Error('There is something wrong with uploads!');
    }
}