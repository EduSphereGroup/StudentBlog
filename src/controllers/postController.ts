import { Request, Response } from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
} from '../models/postModel';

const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await getPostById(Number(req.params.id));
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const addPost = async (req: Request, res: Response): Promise<void> => {
  const { title, summary, content, author } = req.body;
  try {
    const newPost = await createPost(title, summary, content, author);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const editPost = async (req: Request, res: Response): Promise<void> => {
  const { title, summary, content } = req.body;
  try {
    const updatedPost = await updatePost(Number(req.params.id), title, summary, content);
    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const removePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await deletePost(Number(req.params.id));
    if (!success) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const search = async (req: Request, res: Response): Promise<void> => {
  const { keyword } = req.query;
  try {
    const posts = await searchPosts(keyword as string);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export {
  getPosts,
  getPost,
  addPost,
  editPost,
  removePost,
  search,
};
