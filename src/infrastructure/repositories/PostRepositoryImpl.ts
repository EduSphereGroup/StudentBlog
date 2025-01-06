import PostRepository from '../../domain/repositories/PostRepository';
import Post from '../database/models/Post';
import { Op } from 'sequelize';

export default class PostRepositoryImpl implements PostRepository {
  async add(post: Partial<Post>): Promise<Post> {
    return await Post.create(post);
  }

  async findById(id: number): Promise<Post | null> {
    return await Post.findByPk(id);
  }

  async findAll(): Promise<Post[]> {
    return await Post.findAll();
  }

  async update(id: number, post: Partial<Post>): Promise<Post | null> {
    await Post.update(post, {
      where: { id },
    });
    return await Post.findByPk(id);
  }

  async remove(id: number): Promise<boolean> {
    return !!(await Post.destroy({ where: { id } }));
  }

  async search(keyword: string): Promise<Post[]> {
    return await Post.findAll({
      where: {
        title: {
          [Op.like]: `%${keyword}%`,
        },
      },
    });
  }
}