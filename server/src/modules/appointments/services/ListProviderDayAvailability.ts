import { injectable, inject } from "tsyringe";
import {  getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IServiceProps {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

interface IResponse {
    hour: number;
    available: boolean;
}

@injectable()
class ListProviderDayAvailability {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) {}

    public async execute({ provider_id, day, month, year }: IServiceProps): Promise<IResponse[]> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
            provider_id,
            day,
            month,
            year
        });

        const hourStart = 8;

        const eachHoursArray = Array.from(
            { length: 10 },
            (value, index) => index + hourStart
        );
        
        const currentDate = new Date(Date.now());

        const availability = eachHoursArray.map( hour => {
            const appointmentsInHour = appointments.find(appointment => {
                return getHours(appointment.date) === hour;
            });
            
            const compareDate = new Date(year, month - 1, day, hour);

            return {
                hour,
                available: !appointmentsInHour && isAfter(compareDate, currentDate)
            };
        });
        
        return availability;
    }
}

export default ListProviderDayAvailability;