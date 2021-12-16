import { Model, DataTypes} from 'sequelize';
import {sequelize} from '../instances/mysql';

export interface CommentInstance extends Model {
    id_comment: number;
    comment: string;
    id_upload: number;
    id_user: number;
}

export const User = sequelize.define<CommentInstance>('Comment', {
    id_comment: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    comment: {
        type: DataTypes.TEXT
    },
    id_upload: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Upload',
            key: 'id_upload'
        }
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id_user'
        }
    }
}, {
    tableName: 'comments',
    timestamps: false
});