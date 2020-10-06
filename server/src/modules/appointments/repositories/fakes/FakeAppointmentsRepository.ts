import { uuid } from 'uuidv4';
import { isEqual, getYear, getMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async create({ user_id, provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment  = new Appointment();
        appointment.id = uuid();
        appointment.user_id = user_id;
        appointment.provider_id = provider_id;
        appointment.date = date;

        this.appointments.push(appointment);

        return appointment;
    }

    public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date)
            &&
            appointment.provider_id === provider_id
        );

        return findAppointment;
    }

    public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const findAppointments = this.appointments.filter(appointment => 
            appointment.provider_id === provider_id &&
            getYear(appointment.date) === year &&
            getMonth(appointment.date) + 1 === month
        );

        return findAppointments;
    }

    public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const findAppointments = this.appointments.filter(appointment => 
            appointment.provider_id === provider_id &&
            getYear(appointment.date) === year &&
            getMonth(appointment.date) + 1 === month &&
            getDate(appointment.date) === day
        );

        return findAppointments;
    }
}

export default AppointmentsRepository;