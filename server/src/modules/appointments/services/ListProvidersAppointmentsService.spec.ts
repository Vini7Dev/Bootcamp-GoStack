import ListProvidersAppointmentsService from './ListProvidersAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/Cacheprovider/fakes/FakeCacheProvider';

let listProvidersAppointments: ListProvidersAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: IAppointmentsRepository;

describe('ListProvidersAppointmentsService', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProvidersAppointments = new ListProvidersAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider
        );
    });

    it('should be able to list all appointments on a specific day', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 8, 28, 14, 0, 0)
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 8, 28, 16, 0, 0)
        });

        const result = await listProvidersAppointments.execute({
            provider_id: 'provider',
            day: 28,
            month: 9,
            year: 2020
        });

        expect(result).toEqual([
            appointment1,
            appointment2
        ]);
    });
});