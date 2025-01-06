import { Request, Response } from 'express';
import createPost from '../../use-cases/posts/CreatePost';
import getPostById from '../../use-cases/posts/GetPostById';
import listPosts from '../../use-cases/posts/ListPosts';
import updatePost from '../../use-cases/posts/UpdatePost';
import deletePost from '../../use-cases/posts/DeletePost';
import searchPosts from '../../use-cases/posts/SearchPosts';

export default {
  async listPosts(req: Request, res: Response) {
    const posts = await listPosts();
    res.json(posts);
  },

  async getPostById(req: Request, res: Response) {
    const post = await getPostById(parseInt(req.params.id));
    res.json(post);
  },

  async createPost(req: Request, res: Response) {
    const newPost = await createPost(req.body);
    res.status(201).json(newPost);
  },

  async updatePost(req: Request, res: Response) {
    const updatedPost = await updatePost(parseInt(req.params.id), req.body);
    res.json(updatedPost);
  },

  async deletePost(req: Request, res: Response) {
    await deletePost(parseInt(req.params.id));
    res.status(204).end();
  },

  async searchPosts(req: Request, res: Response) {
    const results = await searchPosts(req.query.q as string);
    res.json(results);
  },
};