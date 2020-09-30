import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/Cacheprovider/model/ICacheProvider';

interface IServiceProps {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListProvidersAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) {}

    public async execute({ provider_id, day, month, year }: IServiceProps): Promise<Appointment[]>{
        const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
        
        let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey);

        if(!appointments) {
            appointments = await this.appointmentsRepository.findAllInDayFromProvider({
                provider_id,
                day,
                month,
                year
            });

            await this.cacheProvider.save(cacheKey, appointments);

            console.log('Buscou no Banco!!!');
        }

        return appointments;
    }
}

export default ListProvidersAppointmentsService;