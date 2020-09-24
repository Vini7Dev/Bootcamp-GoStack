import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import IFindAllProviders from '@modules/users/dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
    findAllProviders(data: IFindAllProviders): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUsersDTO): Promise<User>;
    update(user: User): Promise<User>;
}