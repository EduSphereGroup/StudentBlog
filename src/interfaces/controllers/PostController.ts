/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API de postagens do blog
 */

import { Request, Response } from 'express';
import createPost from '../../use-cases/posts/CreatePost';
import getPostById from '../../use-cases/posts/GetPostById';
import listPosts from '../../use-cases/posts/ListPosts';
import updatePost from '../../use-cases/posts/UpdatePost';
import deletePost from '../../use-cases/posts/DeletePost';
import searchPosts from '../../use-cases/posts/SearchPosts';

export default {
  /**
   * @swagger
   * /posts:
   *   get:
   *     summary: Lista todas as postagens
   *     tags: [Posts]
   *     responses:
   *       200:
   *         description: Lista de postagens
   */
  async listPosts(req: Request, res: Response) {
    const posts = await listPosts();
    res.json(posts);
  },

  /**
   * @swagger
   * /posts/{id}:
   *   get:
   *     summary: Obtém uma postagem por ID
   *     tags: [Posts]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da postagem
   *     responses:
   *       200:
   *         description: Detalhes da postagem
   */
  async getPostById(req: Request, res: Response) {
    const post = await getPostById(parseInt(req.params.id));
    res.json(post);
  },

  /**
   * @swagger
   * /posts:
   *   post:
   *     summary: Cria uma nova postagem
   *     tags: [Posts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               content:
   *                 type: string
   *               author:
   *                 type: string
   *     responses:
   *       201:
   *         description: Postagem criada com sucesso
   */
  async createPost(req: Request, res: Response) {
    const newPost = await createPost(req.body);
    res.status(201).json(newPost);
  },

  /**
   * @swagger
   * /posts/{id}:
   *   put:
   *     summary: Atualiza uma postagem existente
   *     tags: [Posts]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da postagem
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *               content:
   *                 type: string
   *     responses:
   *       200:
   *         description: Postagem atualizada com sucesso
   */
  async updatePost(req: Request, res: Response) {
    const updatedPost = await updatePost(parseInt(req.params.id), req.body);
    res.json(updatedPost);
  },

  /**
   * @swagger
   * /posts/{id}:
   *   delete:
   *     summary: Exclui uma postagem por ID
   *     tags: [Posts]
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da postagem
   *     responses:
   *       204:
   *         description: Postagem excluída com sucesso
   */
  async deletePost(req: Request, res: Response) {
    await deletePost(parseInt(req.params.id));
    res.status(204).end();
  },

  /**
   * @swagger
   * /posts/search:
   *   get:
   *     summary: Busca postagens por palavra-chave
   *     tags: [Posts]
   *     parameters:
   *       - name: q
   *         in: query
   *         required: true
   *         schema:
   *           type: string
   *         description: Palavra-chave de busca
   *     responses:
   *       200:
   *         description: Resultados da busca
   */
  async searchPosts(req: Request, res: Response) {
    const results = await searchPosts(req.query.q as string);
    res.json(results);
  },
};