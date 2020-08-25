import Appointment from '../models/appointment';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../reporitories/appointmentsRepository';

interface CreateProps {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({provider, date}: CreateProps): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate)
            throw Error('This appointment is already booked.');

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;