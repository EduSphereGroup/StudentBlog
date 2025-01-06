import UserRepositoryImpl from '../../infrastructure/repositories/UserRepositoryImpl';
import User from '../../infrastructure/database/models/User';

const userRepository = new UserRepositoryImpl();

export default async function getUserById(id: number): Promise<User | null> {
  return await userRepository.findById(id);
}