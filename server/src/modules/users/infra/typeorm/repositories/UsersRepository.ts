import { getRepository, Not, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>
    
    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findAllProviders({ exept_user_id }: IFindAllProvidersDTO): Promise<User[]> {
        let users: User[];
        
        if(exept_user_id) {
            users = await this.ormRepository.find({
                where: {
                    id: Not(exept_user_id)
                }
            });
        } else {
            users = await this.ormRepository.find();
        }

        return users;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { id }
        });

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email }
        });

        return user;
    }

    public async create(userData: ICreateUsersDTO): Promise<User> {
        const user = this.ormRepository.create(userData);

        await this.ormRepository.save(user);

        return user;
    }

    public async update(user: User): Promise<User> {
        await this.ormRepository.save(user);

        return user;
    }

}

export default UsersRepository;