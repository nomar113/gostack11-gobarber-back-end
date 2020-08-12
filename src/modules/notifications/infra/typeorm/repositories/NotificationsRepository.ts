import { getMongoRepository, MongoRepository } from 'typeorm';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';

export default class NotificationsRepository
  implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongodb');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationsDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });
    await this.ormRepository.save(notification);
    return notification;
  }
}
