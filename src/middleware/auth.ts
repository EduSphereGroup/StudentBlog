import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  role: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}

// Mudando o tipo de retorno de 'void' para 'void | Response'
const protect = (req: Request, res: Response, next: NextFunction): void | Response => {
  // Authentication middleware logic
  // Se você não tem lógica de autenticação aqui, você pode apenas chamar next()
  next();
  return; // Retorno explícito de void
};

// Mudando o tipo de retorno da função retornada para 'void | Response'
const authorize = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void | Response => {
    if (!req.user) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
    return; // Retorno explícito de void
  };
};

export { protect, authorize };