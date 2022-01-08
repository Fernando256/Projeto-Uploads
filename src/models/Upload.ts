import { Model, DataTypes} from 'sequelize';
import {sequelize} from '../instances/mysql';

export interface UploadInstance extends Model {
    id_upload: number;
    title: string;
    description: string;
    date_upload: Date;
    ext_archive: string;
    id_user: number;
}

export const Upload = sequelize.define<UploadInstance>('Upload', {
    id_upload: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    date_upload: {
        type: DataTypes.DATE,
    },
    file_name: {
        type: DataTypes.STRING
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id_user'
        }
    }
}, {
    tableName: 'uploads',
    timestamps: false
});