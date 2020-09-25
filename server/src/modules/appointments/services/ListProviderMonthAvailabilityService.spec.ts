import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();

        listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
            fakeAppointmentsRepository
        );
    });

    it('should be able to list the month availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 24, 8, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 24, 9, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 24, 10, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 24, 11, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 24, 12, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 24, 13, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 24, 14, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 24, 15, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 24, 16, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 24, 17, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 25, 9, 0, 0)
        });

        const availability = await listProviderMonthAvailability.execute({
            provider_id: 'provider123',
            month: 9,
            year: 2020
        });

        expect(availability).toEqual(expect.arrayContaining([
            { day: 23, available: true },
            { day: 24, available: false },
            { day: 25, available: true }
        ]));
    });
});