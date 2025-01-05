import { pool } from '../config/db';

interface Post {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  created_at: Date;
  updated_at: Date;
}

const getAllPosts = async (): Promise<Post[]> => {
  const { rows } = await pool.query('SELECT id, title, summary, author FROM posts');
  return rows;
};

const getPostById = async (id: number): Promise<Post | null> => {
  const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return rows.length ? rows[0] : null;
};

const createPost = async (title: string, summary: string, content: string, author: string): Promise<Post> => {
  const { rows } = await pool.query(
    'INSERT INTO posts (title, summary, content, author) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, summary, content, author]
  );
  return rows[0];
};

const updatePost = async (id: number, title: string, summary: string, content: string): Promise<Post | null> => {
  const { rows } = await pool.query(
    'UPDATE posts SET title = $1, summary = $2, content = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
    [title, summary, content, id]
  );
  return rows.length ? rows[0] : null;
};

const deletePost = async (id: number): Promise<boolean> => {
  const { rowCount } = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
  // Verifica se rowCount não é null antes de comparar
  return rowCount !== null && rowCount > 0;
};

const searchPosts = async (keyword: string): Promise<Post[]> => {
  const { rows } = await pool.query(
    "SELECT id, title, summary, author FROM posts WHERE title ILIKE $1 OR content ILIKE $1",
    [`%${keyword}%`]
  );
  return rows;
};

export {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
};
