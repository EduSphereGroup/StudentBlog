import User from '../../infrastructure/database/models/User';

export default interface UserRepository {
  add(user: Partial<User>): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  update(id: number, user: Partial<User>): Promise<User | null>;
  remove(id: number): Promise<boolean>;
}