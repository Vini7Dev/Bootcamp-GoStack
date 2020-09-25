import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailability from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailability;

describe('ListProviderDayAvailabilityService', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();

        listProviderDayAvailability = new ListProviderDayAvailability(
            fakeAppointmentsRepository
        );
    });

    it('should be able to list the day availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 25, 10, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 25, 12, 0, 0)
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider123',
            user_id: 'customer123',
            date: new Date(2020, 8, 25, 13, 0, 0)
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 8, 25, 11, 0, 0).getTime();
        });

        const availability = await listProviderDayAvailability.execute({
            provider_id: 'provider123',
            day: 25,
            month: 9,
            year: 2020
        });

        expect(availability).toEqual(expect.arrayContaining([
            { hour: 9, available: false },
            { hour: 10, available: false },
            { hour: 12, available: false },
            { hour: 13, available: false },
            { hour: 14, available: true },
            { hour: 15, available: true },
        ]));
    });
});