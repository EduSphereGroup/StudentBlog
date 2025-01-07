import loginUser from '../LoginUser';
import UserRepositoryImpl from '../../../infrastructure/repositories/UserRepositoryImpl';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../../../infrastructure/repositories/UserRepositoryImpl');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

const userRepository = new UserRepositoryImpl();
const mockUser = { id: 1, username: 'testuser', email: 'testuser@example.com', password: 'hashedpassword' };
(userRepository.findByEmail as jest.Mock).mockImplementation(email => Promise.resolve(mockUser));
(bcrypt.compare as jest.Mock).mockImplementation((password, hashed) => Promise.resolve(true));
(jwt.sign as jest.Mock).mockImplementation(() => 'token');

describe('LoginUser Use Case', () => {
  it('should login a user', async () => {
    const { user, token } = await loginUser('testuser@example.com', 'password');

    expect(user).toEqual(mockUser);
    expect(token).toBe('token');
    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
  });

  it('should return null if user not found', async () => {
    (userRepository.findByEmail as jest.Mock).mockImplementation(email => Promise.resolve(null));
    
    const { user, token } = await loginUser('notfound@example.com', 'password');

    expect(user).toBeNull();
    expect(token).toBeNull();
  });

  it('should return null if password does not match', async () => {
    (bcrypt.compare as jest.Mock).mockImplementation((password, hashed) => Promise.resolve(false));

    const { user, token } = await loginUser('testuser@example.com', 'wrongpassword');

    expect(user).toBeNull();
    expect(token).toBeNull();
  });
});