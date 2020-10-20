import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter, isBefore } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IServiceProps {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) {}

    public async execute({ provider_id, month, year }: IServiceProps): Promise<IResponse> {        
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
            provider_id,
            month,
            year
        });

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

        const echoArrayDay = Array.from(
            { length: numberOfDaysInMonth },
            (value, index) => index + 1
        );

        const availability = echoArrayDay.map(day => {
            const compareDate = new Date(year, month - 1, day, 23, 59, 59);

            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });

            return {
                day,
                available: isBefore(new Date().getTime(), compareDate.getTime()) && appointmentsInDay.length < 10
            };
        });

        return availability;
    }
}

export default ListProviderMonthAvailabilityService;