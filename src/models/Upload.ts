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

export const User = sequelize.define<UploadInstance>('Upload', {
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
        defaultValue: Date.now()
    },
    ext_archive: {
        type: DataTypes.STRING
    },
    id_user: {
        type:DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id_user'
        }
    }
}, {
    tableName: 'comments',
    timestamps: false
});