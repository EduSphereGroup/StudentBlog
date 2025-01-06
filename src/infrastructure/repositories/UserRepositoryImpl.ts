import UserRepository from '../../domain/repositories/UserRepository';
import User from '../database/models/User';

export default class UserRepositoryImpl implements UserRepository {
  async add(user: Partial<User>): Promise<User> {
    return await User.create(user);
  }

  async findById(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await User.findOne({ where: { username } });
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    await User.update(user, {
      where: { id },
    });
    return await User.findByPk(id);
  }

  async remove(id: number): Promise<boolean> {
    return !!(await User.destroy({ where: { id } }));
  }
}