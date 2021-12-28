import { User } from '../models/User';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const createUser = async (name: string, email: string, password: string) => {
    const hasUser = await User.findOne({
        where: {
            email
        }
    });
    if (!hasUser) {
        try {
            const hash = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS as string));
            const newUser = await User.create({
                name,
                email,
                password: hash
            });
            return newUser;
        }catch(e) {
            console.log(e);
        }
    } else
        return new Error('Email existente!');
}

export const matchPassword = (passwordText: string, passwordEncrypted: string) => {
    return bcrypt.compareSync(passwordText, passwordEncrypted);
}

export const findByEmail = async (email: string) => {
    return User.findOne({where: {email}});
}

