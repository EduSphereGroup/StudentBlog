import getUserById from '../GetUserById';
import UserRepositoryImpl from '../../../infrastructure/repositories/UserRepositoryImpl';

jest.mock('../../../infrastructure/repositories/UserRepositoryImpl');

const userRepository = new UserRepositoryImpl();
const mockUser = { id: 1, username: 'testuser', email: 'testuser@example.com', password: 'password' };
(userRepository.findById as jest.Mock).mockImplementation(id => Promise.resolve(mockUser));

describe('GetUserById Use Case', () => {
  it('should return a user by id', async () => {
    const user = await getUserById(1);

    expect(user).toEqual(mockUser);
    expect(userRepository.findById).toHaveBeenCalledTimes(1);
  });
});