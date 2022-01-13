import { UserInterface } from '../interfaces/UserInterface';
import * as AccountService from './AccountService';
import { sequelize } from "../instances/mysql";


describe('Testing Account Service', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true}).catch((error) => {
            console.error(error);
        });  
    });

    let user: UserInterface = {
        name: 'Test',
        email: 'teste@teste.com',
        password: 'abc1234'
    }

    it('should create a new user', async () => {
        const newUser = await AccountService.createUser(user) as UserInterface;
        expect(newUser).not.toBeInstanceOf(Error);
        expect(newUser).toHaveProperty('id_user');
        expect(newUser.name).toBe(user.name);
        expect(newUser.email).toBe(user.email)
    });

    it('should do not create a new user', async () => {
        const newUser = await AccountService.createUser(user) as UserInterface;
        expect(newUser).toBeInstanceOf(Error);
        expect(newUser).not.toHaveProperty('id_user');
    });

    it('should match the password from database', async () => {
        const userDB = await AccountService.findByEmail(user.email) as UserInterface;
        const match = AccountService.matchPassword(user.password, userDB.password);
        expect(match).toBe(true);
    });

    it('should not match the password from database', async () => {
        const userDB = await AccountService.findByEmail(user.email) as UserInterface;
        const match = AccountService.matchPassword('invalid', userDB.password);
        expect(match).toBe(false);
    });

    it('should get a user with email', async () => {
        const userDB = await AccountService.findByEmail(user.email) as UserInterface;
        expect(userDB).toHaveProperty('id_user');
        expect(userDB.email).toBe(user.email);
    });

    it('should not find any user with email', async () => {
        const userDB = await AccountService.findByEmail('abc@abc.com') as UserInterface;
        expect(userDB).toBeNull();
    });
});