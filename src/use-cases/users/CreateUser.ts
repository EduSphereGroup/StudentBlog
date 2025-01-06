import UserRepositoryImpl from '../../infrastructure/repositories/UserRepositoryImpl';
import User from '../../infrastructure/database/models/User';
import bcrypt from 'bcrypt';

const userRepository = new UserRepositoryImpl();

export default async function createUser(userData: Partial<User>): Promise<User> {
  if (!userData.password) {
    throw new Error("Password is required");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user: Partial<User> = { ...userData, password: hashedPassword };

  return await userRepository.add(user as User);
}