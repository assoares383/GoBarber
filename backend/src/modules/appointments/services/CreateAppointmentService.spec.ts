import AppError from '@shared/errors/AppError';

import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationRepository: FakeNotificationRepository;
let fakeCacheProvider: FakeCacheProvider;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeNotificationRepository = new FakeNotificationRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationRepository,
      fakeCacheProvider
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 5, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2021, 4, 5, 13),
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider-id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 4, 25, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'user-id',
        provider_id: 'provider-id',
      })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 4, 5, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 5, 11),
        user_id: 'user-id',
        provider_id: 'provider-id'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', 
    async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2021, 4, 5, 12).getTime();
      });

      await expect(
        createAppointment.execute({
          date: new Date(2021, 4, 5, 13),
          user_id: 'user-id',
          provider_id: 'user-id'
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  );

  it('should not be able to create an appointment before 8am and after 5pm', 
    async () => {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
        return new Date(2021, 4, 5, 12).getTime();
      });

      await expect(
        createAppointment.execute({
          date: new Date(2021, 4, 9, 7),
          user_id: 'user-id',
          provider_id: 'provider-id'
        }),
      ).rejects.toBeInstanceOf(AppError);

      await expect(
        createAppointment.execute({
          date: new Date(2021, 4, 9, 18),
          user_id: 'user-id',
          provider_id: 'provider-id'
        }),
      ).rejects.toBeInstanceOf(AppError);
    }
  );
});