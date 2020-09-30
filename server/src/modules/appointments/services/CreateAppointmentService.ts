import { injectable, inject } from 'tsyringe';
import { startOfHour, isBefore, getHours, format } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationdRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/Cacheprovider/model/ICacheProvider';

import AppError from '@shared/errors/AppError';

interface ICreateProps {
    user_id: string;
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationdRepository')
        private notificationdRepository: INotificationdRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) {}

    public async execute({ user_id, provider_id, date }: ICreateProps): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if(isBefore(appointmentDate, Date.now())) {
            throw new AppError("You can't create an appointment on past date.");
        }

        if(user_id === provider_id) {
            throw new AppError("You can't create an appointment with yourself.");
        }

        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError('You can only create appointments between 8am and 5pm');
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw new AppError('This appointment is already booked.');
        }

        const appointment = await this.appointmentsRepository.create({
            user_id,
            provider_id,
            date: appointmentDate
        });

        const dateFormated = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm'h'");

        await this.notificationdRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para dia ${dateFormated}`
        });

        const cacheKey = `provider-appointments:${provider_id}:${format(date, 'yyyy-M-d')}`;

        await this.cacheProvider.invalidate(cacheKey);

        return appointment;
    }
}

export default CreateAppointmentService;