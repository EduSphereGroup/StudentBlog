import deleteUser from '../DeleteUser';
import UserRepositoryImpl from '../../../infrastructure/repositories/UserRepositoryImpl';

jest.mock('../../../infrastructure/repositories/UserRepositoryImpl');

const userRepository = new UserRepositoryImpl();
(userRepository.remove as jest.Mock).mockImplementation(id => Promise.resolve(true));

describe('DeleteUser Use Case', () => {
  it('should delete a user', async () => {
    const result = await deleteUser(1);

    expect(result).toBe(true);
    expect(userRepository.remove).toHaveBeenCalledTimes(1);
  });
});