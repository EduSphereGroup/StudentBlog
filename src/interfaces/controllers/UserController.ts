import { Request, Response } from 'express';
import createUser from '../../use-cases/users/CreateUser';
import loginUser from '../../use-cases/users/LoginUser';
import getUserById from '../../use-cases/users/GetUserById';
import updateUser from '../../use-cases/users/UpdateUser';
import deleteUser from '../../use-cases/users/DeleteUser';

export default {
  async registerUser(req: Request, res: Response) {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  },

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    if (user && token) {
      res.json({ user, token });
    } else {
      res.status