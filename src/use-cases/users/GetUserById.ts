import UserRepositoryImpl from '../../infrastructure/repositories/UserRepositoryImpl';

const userRepository = new UserRepositoryImpl();

export default async function getUserById(id: number): Promise<User | null> {
  return await userRepository.findById(id);
}