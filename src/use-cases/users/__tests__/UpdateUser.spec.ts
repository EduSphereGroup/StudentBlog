import updateUser from '../UpdateUser';
import UserRepositoryImpl from '../../../infrastructure/repositories/UserRepositoryImpl';

jest.mock('../../../infrastructure/repositories/UserRepositoryImpl');

const userRepository = new UserRepositoryImpl();
const updatedUser = { id: 1, username: 'updateduser', email: 'updateduser@example.com', password: 'updatedpassword' };
(userRepository.update as jest.Mock).mockImplementation((id, user) => 
  Promise.resolve({ id, ...user })
);

describe('UpdateUser Use Case', () => {
  it('should update an existing user', async () => {
    const updatedUserData = { username: 'updateduser', email: 'updateduser@example.com', password: 'updatedpassword' };
    const result = await updateUser(1, updatedUserData);

    expect(result).toEqual(updatedUser);
    expect(userRepository.update).toHaveBeenCalledTimes(1);
  });
});