import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import FakeCacheProvider from '@shared/container/providers/Cacheprovider/fakes/FakeCacheProvider';

import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('Create Appointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
            fakeCacheProvider
        );
    });

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 25, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2020, 9, 25, 13),
            provider_id: 'provider-id',
            user_id: 'user-id'
        });

        expect(appointment).toHaveProperty('id');
    });

    it('should not be able to create a new appointment on the same time', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 25, 12).getTime();
        });
        
        const appointmentDate = new Date(2020, 9, 25, 12);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: 'provider-id',
            user_id: 'user-id'
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: 'provider-id',
                user_id: 'user-id'
            }
        )).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment on the past time', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 25, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 9, 25, 11),
                provider_id: 'provider-id',
                user_id: 'user-id'
            }
        )).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a new appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 25, 12).getTime();
        });

        expect(
            createAppointment.execute({
                date: new Date(2020, 9, 25, 13),
                provider_id: 'user-id',
                user_id: 'user-id'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 9, 25, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 9, 25, 7),
                provider_id: 'provider-id',
                user_id: 'user-id'
            })
        );

        await expect(
            createAppointment.execute({
                date: new Date(2020, 9, 25, 18),
                provider_id: 'provider-id',
                user_id: 'user-id'
            })
        );
    });
});