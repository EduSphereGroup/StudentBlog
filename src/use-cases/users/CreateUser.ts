import UserRepositoryImpl from '../../infrastructure/repositories/UserRepositoryImpl';
import User from '../../infrastructure/database/models/User';
import bcrypt from 'bcrypt';

const userRepository = new UserRepositoryImpl();

export default async function createUser(userData: Partial<User>): Promise<User> {
  const hashedPassword = await bcrypt.hash(userData.password as string, 10);
  const user = { ...userData, password: hashedPassword } as User;

  return await userRepository.add(user);
}