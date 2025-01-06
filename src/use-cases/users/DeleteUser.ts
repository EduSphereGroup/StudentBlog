import UserRepositoryImpl from '../../infrastructure/repositories/UserRepositoryImpl';

const userRepository = new UserRepositoryImpl();

export default async function deleteUser(id: number): Promise<boolean> {
  return await userRepository.remove(id);
}