import { getMongoRepository, MongoRepository } from 'typeorm'

import Notification from '../schemas/Notification';

import ICreateNotificationDTO from '../../../dtos/ICreateNotificationDTO';
import INotificationsRepository from '../../../repositories/INotificationsRepository';

class NotificationsRepository implements INotificationsRepository {
    private ormRepository: MongoRepository<Notification>;

    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({ recipient_id, content }: ICreateNotificationDTO): Promise<Notification> {
        const notification = await this.ormRepository.create({
            recipient_id,
            content
        });

        await this.ormRepository.save(notification);

        return notification
    }
}

export default NotificationsRepository;