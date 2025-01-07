import createUser from '../CreateUser';
import UserRepositoryImpl from '../../../infrastructure/repositories/UserRepositoryImpl';
import bcrypt from 'bcrypt';

jest.mock('../../../infrastructure/repositories/UserRepositoryImpl');
jest.mock('bcrypt');

const userRepository = new UserRepositoryImpl();
const hashedPassword = 'hashedpassword';
(bcrypt.hash as jest.Mock).mockImplementation(() => Promise.resolve(hashedPassword));
(userRepository.add as jest.Mock).mockImplementation(user => Promise.resolve({ id: 1, ...user }));

describe('CreateUser Use Case', () => {
  it('should create a new user', async () => {
    const newUser = { username: 'testuser', email: 'testuser@example.com', password: 'password' };
    const createdUser = await createUser(newUser);

    expect(createdUser).toHaveProperty('id');
    expect(createdUser.username).toBe(newUser.username);
    expect(createdUser.password).toBe(hashedPassword);
    expect(userRepository.add).toHaveBeenCalledTimes(1);
  });
});