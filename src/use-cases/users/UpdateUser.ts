import UserRepositoryImpl from '../../infrastructure/repositories/UserRepositoryImpl';
import User from '../../infrastructure/database/models/User';

const userRepository = new UserRepositoryImpl();

export default async function updateUser(id: number, userData: Partial<User>): Promise<User | null> {
  return await userRepository.update(id, userData);
}