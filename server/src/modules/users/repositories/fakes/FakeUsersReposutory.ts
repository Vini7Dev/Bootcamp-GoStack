import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = []

    public async findById(id: string): Promise<User | undefined> {
        const userFound = this.users.find(user => user.id === id);

        return userFound;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const userFound = this.users.find(user => user.email === email);

        return userFound;
    }

    public async create({ name, email, password }: ICreateUsersDTO): Promise<User> {
        const user = new User();
        user.id = uuid();
        user.name = name;
        user.email = email;
        user.password = password;

        this.users.push(user);

        return user;
    }

    public async update(user: User): Promise<User> {
        const findIndex = this.users.findIndex(userFind => userFind.id === user.id);

        this.users[findIndex] = user;

        return user;
    }
}

export default FakeUsersRepository;