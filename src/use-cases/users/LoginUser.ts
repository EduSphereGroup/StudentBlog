import UserRepositoryImpl from '../../infrastructure/repositories/UserRepositoryImpl';
import User from '../../infrastructure/database/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRepository = new UserRepositoryImpl();

interface LoginResponse {
  user: User | null;
  token: string | null;
}

export default async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const user = await userRepository.findByEmail(email);
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return { user, token };
  }

  return { user: null, token: null };
}