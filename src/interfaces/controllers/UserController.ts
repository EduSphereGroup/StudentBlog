/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API de gerenciamento de usuários
 */

import { Request, Response } from 'express';
import createUser from '../../use-cases/users/CreateUser';
import loginUser from '../../use-cases/users/LoginUser';
import getUserById from '../../use-cases/users/GetUserById';
import updateUser from '../../use-cases/users/UpdateUser';
import deleteUser from '../../use-cases/users/DeleteUser';

export default {
  /**
   * @swagger
   * /users/register:
   *   post:
   *     summary: Registra um novo usuário
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário registrado com sucesso
   */
  async registerUser(req: Request, res: Response) {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  },

  /**
   * @swagger
   * /users/login:
   *   post:
   *     summary: Realiza o login de um usuário
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login realizado com sucesso
   */
  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    if (user && token) {
      res.json({ user, token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  },

  /**
   * @swagger
   * /users/{id}:
   *   get:
   *     summary: Obtém um usuário por ID
   *     tags: [Users]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Detalhes do usuário
   */
  async getUserById(req: Request, res: Response) {
    const user = await getUserById(parseInt(req.params.id));
    res.json(user);
  },

  /**
   * @swagger
   * /users/{id}:
   *   put:
   *     summary: Atualiza um usuário existente
   *     tags: [Users]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   */
  async updateUser(req: Request, res: Response) {
    const updatedUser = await updateUser(parseInt(req.params.id), req.body);
    res.json(updatedUser);
  },

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: Exclui um usuário por ID
   *     tags: [Users]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário
   *     responses:
   *       204:
   *         description: Usuário excluído com sucesso
   */
  async deleteUser(req: Request, res: Response) {
    await deleteUser(parseInt(req.params.id));
    res.status(204).end();
  },
};