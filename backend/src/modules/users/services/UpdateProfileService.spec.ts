import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository:FakeUsersRepository;
let fakeHashProvider:FakeHashProvider;
let updateProfile:UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123123'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com.br'
    });

    expect(updatedUser.name).toBe('John Tre');
    expect(updatedUser.email).toBe('johntre@example.com.br');
  });

  it('should not be able update the profile from non-existing user', 
    async () => {
      await expect(
        updateProfile.execute({
          user_id: 'non-existing-user-id',
          name: 'Test',
          email: 'test@example.com.br'
        })
      ).rejects.toBeInstanceOf(AppError);
    }
  );

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123123'
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com.br',
      password: '111333'
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com.br'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com.br',
      password: '123123'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Tre',
      email: 'johntre@example.com.br',
      old_password: '123123',
      password: '123123'
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', 
    async () => {
      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@example.com.br',
        password: '123123'
      })

      await expect(
        updateProfile.execute({
          user_id: user.id,
          name: 'John Tre',
          email: 'johntre@example.com.br',
          password: '112233'
        })
      ).rejects.toBeInstanceOf(AppError);
    }
  );

  it('should not be able to update the password with wrong old password', 
    async () => {
      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@example.com.br',
        password: '123123'
      })

      await expect(
        updateProfile.execute({
          user_id: user.id,
          name: 'John Tre',
          email: 'johntre@example.com.br',
          old_password: 'wrong-old-password',
          password: '112233'
        })
      ).rejects.toBeInstanceOf(AppError);
    }
  );
});