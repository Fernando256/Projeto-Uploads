import { User } from '../models/User';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export interface UserParams {
    name: string,
    email: string,
    password: string
}

export const createUser = async (user: UserParams) => {
    const hasUser = await User.findOne({
        where: {
            email: user.email
        }
    });
    if (!hasUser) {
        try {
            const hash = bcrypt.hashSync(user.password, parseInt(process.env.SALT_ROUNDS as string));
            const newUser = await User.create({
                name: user.name,
                email: user.email,
                password: hash
            });
            return newUser;
        }catch(e) {
            console.log(e);
        }
    } else
        return new Error('The email already exist!');
}

export const matchPassword = (passwordText: string, passwordEncrypted: string) => {
    return bcrypt.compareSync(passwordText, passwordEncrypted);
}

export const findByEmail = async (email: string) => {
    return User.findOne({where: {email}});
}

